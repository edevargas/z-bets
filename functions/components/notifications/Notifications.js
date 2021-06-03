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
    const { displayName } = betData.user;
    const { homeId, awayId } = betData.match;
    const { homeScore, awayScore } = betData;
    const text = `${displayName} registró una nueva apuesta: ${getScoreMsg(homeId, homeScore, awayId, awayScore)}`;

    return this.sendSlackNotification({ text });
  }
}

exports.Notifications = Notifications;
