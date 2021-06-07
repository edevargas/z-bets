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

module.exports = {
  sorterByName,
  sorterByScore
};