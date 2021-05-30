const { Notifications } = require('./Notifications');
const { MATCH_STATUS } = require('../constants');

exports.sendBetCreationSlackNotificationController = (dataSnapshot, context) => {
  const notifications = new Notifications();

  return notifications.betCreation(dataSnapshot.data(), context);
};

exports.sendWinnersSlackNotificationController = (dataSnapshot) => {
  const changedData = dataSnapshot.after.data();

  if (changedData.status === MATCH_STATUS.FINISHED) {
    const notifications = new Notifications();

    return notifications.betWinners(changedData, dataSnapshot.before.id);
  }

  return null;
};
