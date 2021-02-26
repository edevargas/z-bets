const axios = require('axios');

class Notifications {
  betCreation(data) {
    const { displayName } = data.user;
    const { homeScore, awayScore } = data;
    const { homeFlag, awayFlag } = data.match;

    return axios
      .post('https://hooks.slack.com/services/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', {
        text: `${displayName} registró una nueva apuesta ${homeFlag} ${homeScore} - ${awayScore} ${awayFlag}`,
      })
      .then((response) => {
        console.log(`statusCode: ${response.statusCode}`);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

exports.Notifications = Notifications;
