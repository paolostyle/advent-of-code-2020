const getInput = (input) =>
  input.split('\n\n').map((player) => player.split('\n').slice(1).map(Number));

const calculateScore = (winner) =>
  winner.reduce((score, card, index) => score + card * (winner.length - index), 0);

const serializeRound = (player1, player2) => [...player1, 'x', ...player2].toString();

const game = (player1, player2) => {
  const roundHistory = [serializeRound(player1, player2)];

  do {
    const player1Card = player1.shift();
    const player2Card = player2.shift();

    const decksStatus = serializeRound(player1, player2);
    if (roundHistory.includes(decksStatus)) {
      return 1;
    }
    roundHistory.push(decksStatus);

    let subGameWinner = player1Card > player2Card ? 1 : 2;

    if (
      player1Card <= player1.length &&
      player1.length > 0 &&
      player2Card <= player2.length &&
      player2.length > 0
    ) {
      subGameWinner = game(player1.slice(0, player1Card), player2.slice(0, player2Card));
    }

    if (subGameWinner === 1) {
      player1.push(player1Card);
      player1.push(player2Card);
    } else if (subGameWinner === 2) {
      player2.push(player2Card);
      player2.push(player1Card);
    }
  } while (player1.length !== 0 && player2.length !== 0);

  return player1.length > player2.length ? 1 : 2;
};

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

  return calculateScore(winner);
};

const puzzle2 = (input) => {
  const [player1, player2] = getInput(input);

  const winnerId = game(player1, player2);
  const winner = winnerId === 1 ? player1 : player2;

  return calculateScore(winner);
};

module.exports = {
  puzzle1,
  puzzle2,
};
