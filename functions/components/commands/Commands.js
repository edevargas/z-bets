const admin = require('firebase-admin');
const isSameDay = require('date-fns/isSameDay');
const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const { Notifications } = require('../notifications/Notifications');
const { STATUS } = require('../constants/status');
const { getSlackFlag, getScoreMsg } = require('../utils/flag-mapper');

class Commands {
  changeMatchCurrentStatus(currentStatus, newStatus) {
    const notifications = new Notifications();

    const MATCHES_DB = admin.firestore().collection('matches');
    const TIME_ZONE = 'America/Bogota';
    const TODAY = utcToZonedTime(new Date(), TIME_ZONE);
    let isUpdated = false;
    let homeFlag;
    let awayFlag;
    let homeScore;
    let awayScore;

    return MATCHES_DB
      .where('status', '==', currentStatus)
      .get()
      .then((dataSnapshot) => {
        dataSnapshot.forEach((doc) => {
          const MATCH_DATE = utcToZonedTime(doc.data().date.toDate(), TIME_ZONE);
          const isSameDayMatch = isSameDay(MATCH_DATE, TODAY);

          if (isSameDayMatch) {
            homeFlag = doc.data().homeFlag;
            awayFlag = doc.data().awayFlag;
            homeScore = doc.data().homeScore;
            awayScore = doc.data().awayScore;
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
          ? `Empezó el partido ${getSlackFlag(homeFlag)} - ${getSlackFlag(awayFlag)}, Apuestas cerradas! ⚽️`
          : `📣📣 Terminó el partido ${getScoreMsg(homeFlag, homeScore, awayFlag, awayScore)}`;

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
