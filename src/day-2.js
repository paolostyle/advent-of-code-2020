const parseInput = (input) =>
  input.split('\n').map((str) => /(\d{1,2})-(\d{1,2}) ([a-z]): ([a-z]+)/.exec(str).slice(1, 5));

const puzzle1 = (input) =>
  parseInput(input).filter(([min, max, letter, password]) => {
    const matches = (password.match(new RegExp(letter, 'g')) || []).length;
    return matches >= min && matches <= max;
  }).length;

const puzzle2 = (input) =>
  parseInput(input).filter(
    ([index1, index2, letter, password]) =>
      (password[index1 - 1] === letter && password[index2 - 1] !== letter) ||
      (password[index1 - 1] !== letter && password[index2 - 1] === letter)
  ).length;

module.exports = {
  puzzle1,
  puzzle2,
};
