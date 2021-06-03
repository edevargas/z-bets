const { Notifications } = require('./Notifications');

exports.sendBetCreationSlackNotificationController = (dataSnapshot, context) => {
  const notifications = new Notifications();

  return notifications.betCreation(dataSnapshot.data(), context);
};
