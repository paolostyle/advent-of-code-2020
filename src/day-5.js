const getPasses = (input) => input.split('\n');

const binarySearch = (firstHalfSign, secondHalfSign) => (result, half) => {
  const avg = (result.max - result.min) / 2;
  if (half === firstHalfSign) return { min: result.min, max: result.max - avg };
  if (half === secondHalfSign) return { min: result.min + avg, max: result.max };
};

const getRowFromPass = (pass) =>
  pass.slice(0, 7).split('').reduce(binarySearch('F', 'B'), { min: 0, max: 128 }).min;

const getColFromPass = (pass) =>
  pass.slice(7).split('').reduce(binarySearch('L', 'R'), { min: 0, max: 8 }).min;

const getSeatId = (pass) => getRowFromPass(pass) * 8 + getColFromPass(pass);

const puzzle1 = (input) => Math.max(...getPasses(input).map(getSeatId));

const puzzle2 = (input) => {
  const allSeatIdsExceptMine = getPasses(input).map(getSeatId);
  const minSeatId = Math.min(...allSeatIdsExceptMine);
  const maxSeatId = Math.max(...allSeatIdsExceptMine);
  const allSeatIds = Array.from({ length: maxSeatId - minSeatId + 1 }, (_, index) => minSeatId + index);
  return allSeatIds.find(id => !allSeatIdsExceptMine.includes(id));
};

module.exports = {
  puzzle1,
  puzzle2,
};
