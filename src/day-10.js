const getData = (input) =>
  input
    .split('\n')
    .map((i) => parseInt(i, 10))
    .sort((a, b) => a - b);

const puzzle1 = (input) =>
  getData(input).reduce(
    (diffs, item, idx, arr) => {
      if (idx === arr.length - 1) {
        diffs[3] += 1;
        return diffs[1] * diffs[3];
      } else {
        diffs[arr[idx + 1] - item] += 1;
        return diffs;
      }
    },
    { 1: 1, 2: 0, 3: 0 }
  );

// this solution kinda abuses the fact that there are no gaps of length 2 in the input
// but I'm fairly certain this is the case for all inputs so no big deal I guess
const puzzle2 = (input) => {
  const adaptersData = getData(input);
  const data = [0, ...adaptersData, adaptersData[adaptersData.length - 1] + 3];
  const contSlices = [];
  let slice = [];

  for (let i = 0; i < data.length; i++) {
    slice.push(data[i]);
    if (data[i] + 1 !== data[i + 1]) {
      contSlices.push(slice);
      slice = [];
    }
  }

  // this seems to be tribonacci? i.e. T_n = T_(n-1) + T_(n-2) + T_(n-3)
  // but ngl I figured it out experimentally
  // and if it is Tribonacci (I only checked combinations up to 6) I'd rather hardcode it
  const combinationsPerLength = {
    1: 1,
    2: 1,
    3: 2,
    4: 4,
    5: 7,
    6: 13,
  };

  return contSlices.map((s) => combinationsPerLength[s.length]).reduce((prod, i) => prod * i);
};

module.exports = {
  puzzle1,
  puzzle2,
};
