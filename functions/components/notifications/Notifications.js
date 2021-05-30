const axios = require('axios');
const admin = require('firebase-admin');
const { getScoreMsg } = require('../utils/flag-mapper');

class Notifications {
  sendSlackNotification(payload) {
    return axios
      .post('https://hooks.slack.com/services/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', payload)
      .then((response) => {
        console.log(`statusCode: ${response.status}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  betCreation(data) {
    const { displayName } = data.user;
    const { homeScore, awayScore } = data;
    const { homeId, awayId } = data.match;

    return this.sendSlackNotification({
      text: `${displayName} registró una nueva apuesta: ${getScoreMsg(homeId, homeScore, awayId, awayScore)}`
    });
  }

  betWinners(data, id) {
    const { homeScore, awayScore } = data;
    let betsResults = [];
    let winners = [];
    let customMsg = 'Nadie ganó 😭';

    return admin.firestore().collection('bets')
      .where('matchId', '==', id)
      .get()
      .then((dataSnapshot) => {
        dataSnapshot.forEach((doc) => {
          betsResults.push(doc.data());
        });

        winners = betsResults
          .filter((bet) => bet.homeScore === homeScore && bet.awayScore === awayScore)
          .map(({ user }) => user.displayName);

        if (winners.length === 1) {
          customMsg = `El ganador es ${winners.join('')} 🥳🥳🥳`;
        }
        if (winners.length > 1) {
          customMsg = `Los ganadores son ${winners.join(', ')} 🥳🥳🥳`;
        }

        return this.sendSlackNotification({
          text: customMsg
        });
      });
  }
}

exports.Notifications = Notifications;
