const admin = require('firebase-admin');
const isSameDay = require('date-fns/isSameDay');
const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const { Notifications } = require('../notifications/Notifications');
const { MATCH_STATUS } = require('../constants');
const { getSlackFlag, getScoreMsg } = require('../utils/flag-mapper');

class Commands {
  changeMatchCurrentStatus(currentStatus, newStatus) {
    const notifications = new Notifications();

    const MATCHES_DB = admin.firestore().collection('matches');
    const TIME_ZONE = 'America/Bogota';
    const TODAY = utcToZonedTime(new Date(), TIME_ZONE);
    let isUpdated = false;
    let homeId;
    let awayId;
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
            homeId = doc.data().homeId;
            awayId = doc.data().awayId;
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
        const status = newStatus === MATCH_STATUS.STARTED
          ? `Empezó el partido ${getSlackFlag(homeId)} - ${getSlackFlag(awayId)}. ¡Apuestas cerradas! ⚽️`
          : `📣📣 Terminó el partido ${getScoreMsg(homeId, homeScore, awayId, awayScore)}`;

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
