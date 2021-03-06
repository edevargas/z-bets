const { Commands } = require('./Commands');
const { STATUS } = require('../constants/status');

exports.changeMatchCurrentStatus = (payload) => {
  const commands = new Commands();
  const { user_name, command } = payload;
  const isAdmin = user_name === 'juan.castaneda';

  if (isAdmin && command) {
    if (command === '/match-start') {
      return commands.changeMatchCurrentStatus(STATUS.pending, STATUS.started);
    }
    if (command === '/match-end') {
      return commands.changeMatchCurrentStatus(STATUS.started, STATUS.finished);
    }
  }

  return Promise.reject(false);
};
