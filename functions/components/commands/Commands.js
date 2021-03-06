const admin = require('firebase-admin');
const { Notifications } = require('../notifications/Notifications');
const { STATUS } = require('../constants/status');

class Commands {
  changeMatchCurrentStatus(payload) {
    const notifications = new Notifications();

    const MATCHES_DB = admin.firestore().collection('matches');
    const TODAY = new Date();
    TODAY.setUTCHours(-5);
    let isUpdated = false;

    return MATCHES_DB
      .where('status', '==', STATUS.pending)
      .get()
      .then((dataSnapshot) => {
        dataSnapshot.forEach((doc) => {
          const parsedMatchDate = doc.data().date.toDate();
          const isSameDayMatch = (
            parsedMatchDate.getFullYear() === TODAY.getFullYear() &&
            parsedMatchDate.getMonth() === TODAY.getMonth() &&
            parsedMatchDate.getDate() === TODAY.getDate()
          );

          if (isSameDayMatch) {
            MATCHES_DB.doc(doc.id)
              .update({
                status: STATUS.started
              });
            isUpdated = true;
          }
        });

        return isUpdated;
      })
      .then((isUpdated) => {
        let result = false;
        if (isUpdated) {
          notifications.sendSlackNotification({
            text: 'Empezó el partido, apuestas cerradas! ⚽️'
          });
          result = true;
        }

        return result;
      });
  }
}

exports.Commands = Commands;
