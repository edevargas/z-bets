const { Commands } = require('./Commands');
const { MATCH_STATUS } = require('../constants');
const { DEFAULT_ADMINS } = require('./config/default-admins');
const { SLACK_COMMANDS } = require('./config/slack-commands');

exports.changeMatchCurrentStatus = (payload) => {
  const commands = new Commands();
  const { user_name, command } = payload;
  const isAdmin = DEFAULT_ADMINS.includes(user_name);

  if (isAdmin && command) {
    if (command === SLACK_COMMANDS.START) {
      return commands.changeMatchCurrentStatus(MATCH_STATUS.PENDING, MATCH_STATUS.STARTED);
    }
    if (command === SLACK_COMMANDS.END) {
      return commands.changeMatchCurrentStatus(MATCH_STATUS.STARTED, MATCH_STATUS.FINISHED);
    }
  }

  return Promise.reject(false);
};
