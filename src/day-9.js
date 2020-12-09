const getData = (input) => input.split('\n').map((i) => parseInt(i, 10));

const findInvalidNumber = (data) =>
  data.find((val, idx) => {
    if (idx < 25) return false;

    const preamble = data.slice(idx - 25, idx);
    return !preamble.filter((entry) => preamble.includes(val - entry)).length;
  });

const findWeakness = (data, goal) => {
  let start = 0;
  let end = 0;
  let sum = 0;
  let slice = [];

  while (sum !== goal) {
    slice = data.slice(start, end);
    sum = slice.reduce((acc, val) => acc + val, 0);
    if (sum < goal) end += 1;
    if (sum > goal) start += 1;
  }
  return Math.min(...slice) + Math.max(...slice);
};

const puzzle1 = (input) => findInvalidNumber(getData(input));

const puzzle2 = (input) => {
  const data = getData(input);

  return findWeakness(data, findInvalidNumber(data));
};

module.exports = {
  puzzle1,
  puzzle2,
};
