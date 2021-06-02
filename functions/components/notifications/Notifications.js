const axios = require('axios');
const admin = require('firebase-admin');
const { getScoreMsg } = require('../utils/flag-mapper');
const { SLACK_WEBHOOK } = require('../constants');

class Notifications {
  sendSlackNotification(payload) {
    return axios
      .post(SLACK_WEBHOOK, payload)
      .then((response) => console.log(`statusCode: ${response.status}`))
      .catch((error) => console.error(error));
  }

  betCreation(betData) {
    const { displayName } = betData.user;
    const { homeId, awayId } = betData.match;
    const { homeScore, awayScore } = betData;
    const text = `${displayName} registró una nueva apuesta: ${getScoreMsg(homeId, homeScore, awayId, awayScore)}`;

    return this.sendSlackNotification({ text });
  }

  betWinners(matchData, id) {
    const { homeScore, awayScore } = matchData;
    let betsResults = [];
    let winners = [];
    let customMsg = 'Nadie ganó 😭';

    const processBets = (dataSnapshot) => {
      dataSnapshot.forEach((doc) => {
        betsResults.push(doc.data());
      });

      winners = betsResults
        .filter((bet) => bet.homeScore === homeScore && bet.awayScore === awayScore)
        .map(({ user }) => user.displayName);

      if (winners.length === 1) {
        customMsg = `El ganador es ${winners.join('')} 🥳🥳🥳`;
      } else if (winners.length > 1) {
        customMsg = `Los ganadores son ${winners.join(', ')} 🥳🥳🥳`;
      }

      return this.sendSlackNotification({ text: customMsg });
    };

    return admin.firestore().collection('bets')
      .where('matchId', '==', id)
      .get()
      .then(processBets);
  }
}

exports.Notifications = Notifications;
