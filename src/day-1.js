const inputToArray = (input) => input.split('\n').map((i) => parseInt(i, 10));

const puzzle1 = (input) =>
  inputToArray(input)
    .filter((item, _, arr) => arr.includes(2020 - item))
    .reduce((result, item) => result * item);

const puzzle2 = (input) => {
  const numbers = inputToArray(input);
  const completedTo2 = numbers.map((i) => 2020 - i);

  return completedTo2
    .flatMap((c) => numbers.filter((item, _, arr) => arr.includes(c - item)))
    .filter((item, index, arr) => arr.indexOf(item) === index)
    .reduce((result, item) => result * item);
};

module.exports = {
  puzzle1,
  puzzle2,
};
