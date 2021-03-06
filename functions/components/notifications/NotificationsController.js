const { Notifications } = require('./Notifications');
const { STATUS } = require('../constants/status');

exports.sendBetCreationSlackNotificationController = (dataSnapshot, context) => {
  const notifications = new Notifications();

  return notifications.betCreation(dataSnapshot.data(), context);
};

exports.sendWinnersSlackNotificationController = (dataSnapshot) => {
  const changedData = dataSnapshot.after.data();

  if (changedData.status === STATUS.finished) {
    const notifications = new Notifications();

    return notifications.betWinners(changedData, dataSnapshot.before.id);
  }

  return null;
};
