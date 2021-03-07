const admin = require('firebase-admin');
const moment = require('moment');
const { Notifications } = require('../notifications/Notifications');
const { STATUS } = require('../constants/status');

const { parseZone } = moment;

class Commands {
  changeMatchCurrentStatus(currentStatus, newStatus) {
    const notifications = new Notifications();

    const MATCHES_DB = admin.firestore().collection('matches');
    const TODAY = parseZone(new Date());
    let isUpdated = false;

    return MATCHES_DB
      .where('status', '==', currentStatus)
      .get()
      .then((dataSnapshot) => {
        dataSnapshot.forEach((doc) => {
          const PARSED_MATCH_DATE = parseZone(doc.data().date.toDate());
          const isSameDayMatch = PARSED_MATCH_DATE.isSame(TODAY, 'day');

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
