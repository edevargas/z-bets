const FLAG_MAPPER = {
  arg: ':flag-ar:',
  bol: ':flag-bo:',
  bra: ':flag-br:',
  chi: ':flag-cl:',
  col: ':flag-co:',
  ecu: ':flag-ec:',
  par: ':flag-py:',
  per: ':flag-pe:',
  uru: ':flag-uy:',
  ven: ':flag-ve:',
};

const getSlackFlag = (teamId = '') => FLAG_MAPPER[teamId] || '';

const getScoreMsg = (homeId, homeScore, awayId, awayScore) => (
  `${getSlackFlag(homeId)} ${homeScore} - ${awayScore} ${getSlackFlag(awayId)}`
);

module.exports = {
  getSlackFlag,
  getScoreMsg
};
