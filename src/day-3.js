const checkSlope = (input, rightAngle, downAngle) => {
  let currCol = 0;
  return input.split('\n').reduce((trees, row, rowNumber) => {
    if (rowNumber % downAngle) return trees;
    const treeEncountered = row[currCol % row.length] === '#';
    currCol += rightAngle;
    return trees + treeEncountered;
  }, 0);
};

const puzzle1 = (input) => checkSlope(input, 3, 1);

const puzzle2 = (input) =>
  [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ].reduce((product, angles) => product * checkSlope(input, ...angles), 1);

module.exports = {
  puzzle1,
  puzzle2,
};
