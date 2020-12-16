const algorithm = (input, searchedTurn) => {
  const startingNumbers = input.split(',');
  const lastTurnSaid = {};
  let turn = 1;
  let lastNumberSaid = null;

  while (turn <= searchedTurn) {
    let numberToSay;
    if (turn <= startingNumbers.length) {
      numberToSay = startingNumbers[turn - 1];
    } else {
      const record = lastTurnSaid[lastNumberSaid];
      numberToSay = record && record.length == 2 ? record[1] - record[0] : 0;
    }

    const record = lastTurnSaid[numberToSay];

    if (!record) {
      lastTurnSaid[numberToSay] = [turn];
    } else {
      if (record.length === 2) {
        record.shift();
      }
      record.push(turn);
    }

    lastNumberSaid = numberToSay;
    turn += 1;
  }

  return lastNumberSaid;
};

const puzzle1 = (input) => algorithm(input, 2020);

// it took hilariously long to get the result (almost 5 minutes) but I don't think I care enough
const puzzle2 = (input) => algorithm(input, 30000000);

module.exports = {
  puzzle1,
  puzzle2,
};
