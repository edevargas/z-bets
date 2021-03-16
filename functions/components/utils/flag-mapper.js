const FLAG_URL = 'https://api.fifa.com/api/v1/picture/flags-sq-1/';

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

const getSlackFlag = (flagUrl = '') => {
  const flagKey = flagUrl.replace(FLAG_URL, '');

  return FLAG_MAPPER[flagKey];
};

const getScoreMsg = (homeFlag, homeScore, awayFlag, awayScore) => (
  `${getSlackFlag(homeFlag)} ${homeScore} - ${awayScore} ${getSlackFlag(awayFlag)}`
);

module.exports = {
  getSlackFlag,
  getScoreMsg
};
