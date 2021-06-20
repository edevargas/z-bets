const sorterByName = (a, b) => {
  const nameA = a.toLowerCase();
  const nameB = b.toLowerCase();
  return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
};

const sorterByScore = (a, b) => {
  if (a.homeScore === b.homeScore) {
    return a.awayScore - b.awayScore;
  }
  return a.homeScore - b.homeScore;
};

const getAmount = (value) => {
  let currencyOptions = {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3
  };
  let finalAmount = new Intl.NumberFormat('en-US', currencyOptions);
  return finalAmount.format(value);
};

module.exports = {
  getAmount,
  sorterByName,
  sorterByScore
};