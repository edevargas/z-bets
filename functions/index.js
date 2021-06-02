const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
// Controllers
const notificationsController = require('./components/notifications/NotificationsController');
const commandsController = require('./components/commands/CommandsController');

const app = express();
app.use(cors());

admin.initializeApp();
const settings = { timestampsInSnapshots: true, ignoreUndefinedProperties: true };
admin.firestore().settings(settings);

app.post('/status', (req, res, next) => {
  return commandsController.changeMatchCurrentStatus(req.body)
    .then((response) => {
      console.log('PAYLOAD', req.body);
      return res.status(200).json({ result: response.data });
    })
    .catch((error) => {
      return next(new Error(error.toString()));
    });
});

app.post('/score', (req, res, next) => {
  return commandsController.changeMatchCurrentScore(req.body)
    .then((response) => {
      console.log('PAYLOAD', req.body);
      return res.status(200).json({ result: response.data });
    })
    .catch((error) => {
      return next(new Error(error.toString()));
    });
});

app.use((error, req, res, next) => {
  if (error) {
    console.error(error);
    return res.status(500).json({
      responseError: error.message
    });
  }

  return console.error(error);
});

exports.sendBetCreationSlackNotification = functions.firestore
  .document('bets/{betId}')
  .onCreate(notificationsController.sendBetCreationSlackNotificationController);

exports.sendWinnersSlackNotification = functions.firestore
  .document('matches/{matchId}')
  .onUpdate(notificationsController.sendWinnersSlackNotificationController);

exports.updatedMatch = functions.https.onRequest(app);
