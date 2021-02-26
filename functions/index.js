const functions = require('firebase-functions');
// Controllers
const notificationsController = require('./components/notifications/NotificationsController.js');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendSlackNotifications = functions.firestore
  .document('bets/{betId}')
  .onCreate(notificationsController.sendSlackNotificationsController);
