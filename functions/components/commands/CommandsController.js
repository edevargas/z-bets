const { Commands } = require('./Commands');
const { STATUS } = require('../constants/status');
const { ADMINS } = require('./config/admins');
const { COMMANDS } = require('./config/slash-commands');

exports.changeMatchCurrentStatus = (payload) => {
  const commands = new Commands();
  const { user_name, command } = payload;
  const isAdmin = ADMINS.includes(user_name);

  if (isAdmin && command) {
    if (command === COMMANDS.start) {
      return commands.changeMatchCurrentStatus(STATUS.pending, STATUS.started);
    }
    if (command === COMMANDS.end) {
      return commands.changeMatchCurrentStatus(STATUS.started, STATUS.finished);
    }
  }

  return Promise.reject(false);
};
