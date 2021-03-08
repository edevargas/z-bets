const admin = require('firebase-admin');
const isSameDay = require('date-fns/isSameDay');
const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const { Notifications } = require('../notifications/Notifications');
const { STATUS } = require('../constants/status');

class Commands {
  changeMatchCurrentStatus(currentStatus, newStatus) {
    const notifications = new Notifications();

    const MATCHES_DB = admin.firestore().collection('matches');
    const TIME_ZONE = 'America/Bogota';
    const TODAY = utcToZonedTime(new Date(), TIME_ZONE);
    let isUpdated = false;

    return MATCHES_DB
      .where('status', '==', currentStatus)
      .get()
      .then((dataSnapshot) => {
        dataSnapshot.forEach((doc) => {
          const MATCH_DATE = utcToZonedTime(doc.data().date.toDate(), TIME_ZONE);
          const isSameDayMatch = isSameDay(MATCH_DATE, TODAY);

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
