const admin = require('firebase-admin');
const isSameDay = require('date-fns/isSameDay');
const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const { Notifications } = require('../notifications/Notifications');
const { MATCH_STATUS, BET_STATUS } = require('../constants');
const { getSlackFlag, getScoreMsg } = require('../utils/flag-mapper');
const { sorterByName, sorterByScore } = require('../utils/misc');

class Commands {
  changeMatchCurrentStatus(currentStatus, newStatus) {
    const notifications = new Notifications();

    const MATCHES_DB = admin.firestore().collection('matches');
    const BETS_DB = admin.firestore().collection('bets');
    const SETTINGS_BETS = admin.firestore().collection('settings').doc('bets');
    const TIME_ZONE = 'America/Bogota';
    const TODAY = utcToZonedTime(new Date(), TIME_ZONE);

    let response = { data: 'Error al actualizar el estado ⚠️', error: true };
    let matchId;
    let homeId;
    let awayId;
    let homeTeam;
    let awayTeam;
    let homeScore;
    let awayScore;
    let betsInProgress = [];

    const updateMatchStatus = (dataSnapshot) => {
      dataSnapshot.forEach((doc) => {
        const match = doc.data();
        const MATCH_DATE = utcToZonedTime(match.date.toDate(), TIME_ZONE);
        const isSameDayMatch = isSameDay(MATCH_DATE, TODAY);

        if (!isSameDayMatch) {
          response.data = 'La fecha del partido no es hoy ❌';
          return response;
        }

        matchId = doc.id;
        homeId = match.homeId;
        awayId = match.awayId;
        homeTeam = match.homeTeam;
        awayTeam = match.awayTeam;
        homeScore = match.homeScore;
        awayScore = match.awayScore;
        response.data = 'Estado del partido actualizado ✅';
        response.error = false;
        MATCHES_DB.doc(matchId).update({ status: newStatus });
      });

      return response;
    };

    const sendNotification = (response) => {
      if (!response.error) {
        let text;
        if (newStatus === MATCH_STATUS.STARTED) {
          const matchStarted = `${homeTeam} ${getSlackFlag(homeId)} - ${getSlackFlag(awayId)} ${awayTeam}`;
          text = `📣📣 Empezó el partido: ${matchStarted}. ¡Apuestas cerradas! ⚽️`;
        } else if (newStatus === MATCH_STATUS.FINISHED) {
          text = `📣📣 Terminó el partido ${getScoreMsg(homeId, homeScore, awayId, awayScore)}`;
        }

        notifications.sendSlackNotification({ text });
      }

      return response;
    };

    const setBetsInProgress = (response) => {
      return BETS_DB
        .where('matchId', '==', matchId)
        .get()
        .then((dataSnapshot) => {
          dataSnapshot.forEach((doc) => {
            betsInProgress.push(doc.data());
            BETS_DB.doc(doc.id).update({ status: BET_STATUS.IN_PROGRESS });
          });
          return response;
        });
    };

    const setBetsFinalStatus = (response) => {
      return BETS_DB
        .where('matchId', '==', matchId)
        .get()
        .then((dataSnapshot) => {
          let winners = [];

          dataSnapshot.forEach((bet) => {
            let finalStatus = BET_STATUS.LOST;
            const betData = bet.data();
            const betId = bet.id;
            if (betData.homeScore === homeScore && betData.awayScore === awayScore) {
              finalStatus = BET_STATUS.WON;
              winners.push(betData);
            }

            BETS_DB.doc(betId).update({ status: finalStatus });
          });

          let customMsg = 'Nadie ganó 😭';
          const userNames = winners.map(({ user }) => user.displayName);

          if (userNames.length === 1) {
            customMsg = `El ganador es ${userNames.join('')} 🥳🥳🥳`;
          } else if (userNames.length > 1) {
            customMsg = `Los ganadores son ${userNames.join(', ')} 🥳🥳🥳`;
          }

          notifications.sendSlackNotification({ text: customMsg });

          return response;
        });
    };

    const updateBetsStatus = (response) => {
      if (response.error) {
        return response;
      }

      if (newStatus === MATCH_STATUS.STARTED) {
        return setBetsInProgress(response);
      }

      if (newStatus === MATCH_STATUS.FINISHED) {
        return setBetsFinalStatus(response);
      }
    };

    const sendGamblers = (response) => {
      if (!response.error && newStatus === MATCH_STATUS.STARTED) {
        const groupByScore = (acc, value) => {
          const grouper = `${value.homeScore}-${value.awayScore}`;
          const getBetsArray = [
            ...(acc[grouper] || []),
            value.user.displayName,
          ].sort(sorterByScore);
          return Object.assign(acc, { [grouper]: getBetsArray.sort(sorterByName) });
        };

        const reducerUsers = (acc, pair) => {
          const [key, users] = pair;
          const [homeScore, awayScore] = key.split('-');
          const score = `:flag-co: ${homeScore} - ${awayScore} :flag-ar:`;
          const quoted = users.join('\n>');
          return `${acc}\n${score}\n>${quoted}\n`;
        };

        const groupedGamblers = betsInProgress.reduce(groupByScore, {});
        const finalBets = Object.entries(groupedGamblers).reduce(reducerUsers, '');

        notifications.sendSlackNotification({ text: `Listado final:\n${finalBets}` });
      }

      return response;
    };

    const sendAmountReward = (response) => {
      if (!response.error) {
        SETTINGS_BETS.get().then((doc) => {
          const { amount } = doc.data();
          const reward = betsInProgress.length * amount;
          const currencyOptions = { style: 'currency', currency: 'COP', maximumSignificantDigits: 3 };
          const finalAmount = new Intl.NumberFormat('es-CO', currencyOptions).format(reward);
          notifications.sendSlackNotification({ text: `💰💰💰 Monto en juego: ${finalAmount}` });
        });
      }

      return response;
    };

    return MATCHES_DB
      .where('status', '==', currentStatus)
      .orderBy('date', 'asc')
      .limit(1)
      .get()
      .then(updateMatchStatus)
      .then(sendNotification)
      .then(updateBetsStatus)
      .then(sendGamblers)
      .then(sendAmountReward);
  }

  changeMatchCurrentScore(command) {
    const notifications = new Notifications();

    const MATCHES_DB = admin.firestore().collection('matches');
    const BETS_DB = admin.firestore().collection('bets');
    const teamSide = command.replace('/goal-', '');

    let nameTeamScored = `${teamSide}Team`;
    let teamScored = `${teamSide}Score`;
    let response = { data: 'Error al actualizar el marcador ⚠️', error: true };
    let match;
    let newScore;

    const updateScore = (dataSnapshot) => {
      dataSnapshot.forEach((doc) => {
        match = doc.data();

        if (!Object.keys(match)) {
          response.data = 'No fue posible actualizar el marcador ❌';
          return response;
        }

        newScore = match[teamScored] + 1;
        MATCHES_DB.doc(doc.id).update({ [teamScored]: newScore });
        match[teamScored] = newScore;
        response.data = 'Gol registrado con éxito ✅';
        response.error = false;
      });

      return response;
    };

    const setBetsLost = (response) => {
      if (response.error) {
        return response;
      }

      return BETS_DB
        .where('matchId', '==', match.id)
        .get()
        .then((dataSnapshot) => {
          dataSnapshot.forEach((doc) => {
            if (newScore > doc.data()[teamScored]) {
              BETS_DB.doc(doc.id).update({ status: BET_STATUS.LOST });
            }
          });

          return response;
        });
    };

    const sendNotification = (response) => {
      if (!response.error) {
        const teamScored = match[nameTeamScored];
        const newScore = getScoreMsg(match.homeId, match.homeScore, match.awayId, match.awayScore);
        notifications.sendSlackNotification({ text: `📣📣 Gol de ${teamScored} ⚽️: ${newScore}` });
      }

      return response;
    };

    return MATCHES_DB
      .where('status', '==', MATCH_STATUS.STARTED)
      .get()
      .then(updateScore)
      .then(setBetsLost)
      .then(sendNotification);
  }
}

exports.Commands = Commands;
