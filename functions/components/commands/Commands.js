const admin = require('firebase-admin');
const { Notifications } = require('../notifications/Notifications');
const { STATUS } = require('../constants/status');

class Commands {
  changeMatchCurrentStatus(currentStatus, newStatus) {
    const notifications = new Notifications();

    const MATCHES_DB = admin.firestore().collection('matches');
    const TODAY = new Date();
    TODAY.setUTCHours(-5);
    let isUpdated = false;

    return MATCHES_DB
      .where('status', '==', currentStatus)
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
                status: newStatus
              });
            isUpdated = true;
          }
        });

        return isUpdated;
      })
      .then((isUpdated) => {
        let result = false;
        const status = newStatus === STATUS.started
          ? 'Empezó el partido, apuestas cerradas! ⚽️'
          : 'Terminó el partido... ⚽️';

        if (isUpdated) {
          notifications.sendSlackNotification({
            text: status
          });
          result = true;
        }

        return result;
      });
  }
}

exports.Commands = Commands;
