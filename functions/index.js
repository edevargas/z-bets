const functions = require('firebase-functions');
const axios = require('axios');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendSlackNotifications = functions.firestore
  .document('bets/{betId}').onCreate((change, context) => {
    console.log('test', context);
    axios
      .post('https://hooks.slack.com/services/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', {
        text: 'Se registró una nueva apuesta',
      })
      .then((response) => {
        console.log(`statusCode: ${response.statusCode}`);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });
