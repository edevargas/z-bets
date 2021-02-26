const { Notifications } = require('./Notifications.js');

exports.sendSlackNotificationsController = (dataSnapshot, context) => {
  const notifications = new Notifications();

  return notifications.betCreation(dataSnapshot.data());
};
