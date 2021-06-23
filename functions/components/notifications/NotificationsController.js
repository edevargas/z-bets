const { Notifications } = require('./Notifications');
const { BET_STATUS } = require('../constants');

exports.sendBetCreationSlackNotificationController = (dataSnapshot, context) => {
  const notifications = new Notifications();

  return notifications.betCreation(dataSnapshot.data(), context);
};

exports.sendBetUpdateSlackNotificationController = (dataSnapshot) => {
  const changedData = dataSnapshot.after.data();

  if (changedData.status === BET_STATUS.PENDING) {
    const notifications = new Notifications();
    return notifications.betUpdate(changedData);
  }

  return null;
};
