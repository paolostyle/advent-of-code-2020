const getInput = (input) =>
  input.split('\n\n').map((player) => player.split('\n').slice(1).map(Number));

const puzzle1 = (input) => {
  const [player1, player2] = getInput(input);

  while (player1.length !== 0 && player2.length !== 0) {
    if (player1[0] > player2[0]) {
      player1.push(player1.shift());
      player1.push(player2.shift());
    }
    if (player1[0] < player2[0]) {
      player2.push(player2.shift());
      player2.push(player1.shift());
    }
  }

  const winner = player1.length > player2.length ? player1 : player2;

  return winner.reduce((score, card, index) => score + card * (winner.length - index), 0);
};

const puzzle2 = (input) => {};

module.exports = {
  puzzle1,
  puzzle2,
};
