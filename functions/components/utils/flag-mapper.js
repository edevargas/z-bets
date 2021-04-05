const FLAG_MAPPER = {
  col: ':flag-co:',
  per: ':flag-pe:',
  arg: ':flag-ar:',
  par: ':flag-py:',
  bol: ':flag-bo:',
  ven: ':flag-ve:',
  chi: ':flag-cl:',
  uru: ':flag-uy:',
  bra: ':flag-br:',
};

const getSlackFlag = (teamId = '') => FLAG_MAPPER[teamId] || '';

const getScoreMsg = (homeId, homeScore, awayId, awayScore) => (
  `${getSlackFlag(homeId)} ${homeScore} - ${awayScore} ${getSlackFlag(awayId)}`
);

module.exports = {
  getSlackFlag,
  getScoreMsg
};
