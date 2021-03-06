const { Commands } = require('./Commands');

exports.changeMatchCurrentStatus = (payload) => {
  const commands = new Commands();

  return commands.changeMatchCurrentStatus(payload);
};
