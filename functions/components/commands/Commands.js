const admin = require('firebase-admin');
const isSameDay = require('date-fns/isSameDay');
const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const { Notifications } = require('../notifications/Notifications');
const { MATCH_STATUS, BET_STATUS } = require('../constants');
const { getSlackFlag, getScoreMsg } = require('../utils/flag-mapper');

class Commands {
  changeMatchCurrentStatus(currentStatus, newStatus) {
    const notifications = new Notifications();

    const MATCHES_DB = admin.firestore().collection('matches');
    const BETS_DB = admin.firestore().collection('bets');
    const TIME_ZONE = 'America/Bogota';
    const TODAY = utcToZonedTime(new Date(), TIME_ZONE);

    let response = { data: 'Error al actualizar el estado ⚠️', error: true };
    let matchId;
    let homeId;
    let awayId;
    let homeScore;
    let awayScore;

    const updateStatus = (dataSnapshot) => {
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
        homeScore = match.homeScore;
        awayScore = match.awayScore;
        response.data = 'Estado del partido actualizado ✅';
        response.error = false;
        MATCHES_DB.doc(matchId).update({ status: newStatus });
      });

      return response;
    };

    const setBetsInProgress = (response) => {
      if (response.error) {
        return response;
      }

      return BETS_DB
        .where('matchId', '==', matchId)
        .get()
        .then((dataSnapshot) => {
          dataSnapshot.forEach((doc) => BETS_DB.doc(doc.id).update({ status: BET_STATUS.IN_PROGRESS }));
          return response;
        });
    };

    const sendNotification = (response) => {
      if (!response.error) {
        const text = newStatus === MATCH_STATUS.STARTED
          ? `📣📣 Empezó el partido ${getSlackFlag(homeId)} - ${getSlackFlag(awayId)}. ¡Apuestas cerradas! ⚽️`
          : `📣📣 Terminó el partido ${getScoreMsg(homeId, homeScore, awayId, awayScore)}`;

        notifications.sendSlackNotification({ text });
      }

      return response;
    };

    return MATCHES_DB
      .where('status', '==', currentStatus)
      .orderBy('date', 'asc')
      .limit(1)
      .get()
      .then(updateStatus)
      .then(setBetsInProgress)
      .then(sendNotification);
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
