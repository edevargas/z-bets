const axios = require('axios');
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
    const action = 'registró una nueva apuesta';
    this.betNotification(betData, action);
  }

  betUpdate(betData) {
    const action = 'actualizó su apuesta a';
    this.betNotification(betData, action);
  }

  betNotification(betData, action) {
    const { displayName } = betData.user;
    const { homeId, awayId } = betData.match;
    const { homeScore, awayScore } = betData;
    const text = `${displayName} ${action}: ${getScoreMsg(homeId, homeScore, awayId, awayScore)}`;

    return this.sendSlackNotification({ text });
  }
}

exports.Notifications = Notifications;
