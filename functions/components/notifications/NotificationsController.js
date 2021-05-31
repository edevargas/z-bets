const { Notifications } = require('./Notifications');
const { MATCH_STATUS } = require('../constants');

exports.sendBetCreationSlackNotificationController = (dataSnapshot, context) => {
  const notifications = new Notifications();

  return notifications.betCreation(dataSnapshot.data(), context);
};

exports.sendWinnersSlackNotificationController = (dataSnapshot) => {
  // TODO: Cambiar nombre del controlador a matchUpdatedController
  const changedData = dataSnapshot.after.data();

  // TODO: Agregar validación por si cambia un marcador -> Cambiar status de apuestas
  if (changedData.status === MATCH_STATUS.FINISHED) {
    const notifications = new Notifications();

    return notifications.betWinners(changedData, dataSnapshot.before.id);
  }

  return null;
};
