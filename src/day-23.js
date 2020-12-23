const testInput = '389125467';

const getCups = (input) => input.split('').map(Number);

const pickUpCups = (cups, currentCupIdx) => {
  const pickedUpCups = cups.splice((currentCupIdx + 1) % cups.length, 3);
  if (pickedUpCups.length !== 3) {
    pickedUpCups.push(...cups.splice(0, 3 - pickedUpCups.length));
  }
  return pickedUpCups;
};

const findDestination = (cups, currentCupValue, maxValue) => {
  let destination = -1;
  let searchedValue = currentCupValue;
  while (destination === -1) {
    searchedValue = searchedValue === 1 ? maxValue : searchedValue - 1;
    destination = cups.findIndex((value) => searchedValue === value);
    if (destination !== -1) destination += 1;
  }
  return destination;
};

const move = (cups, moves, maxValue) => {
  let currentCupIdx = 0;

  for (let i = 0; i < moves; i++) {
    const currentCupValue = cups[currentCupIdx];
    const pickedUpCups = pickUpCups(cups, currentCupIdx);
    const destinationIdx = findDestination(cups, currentCupValue, maxValue);
    cups.splice(destinationIdx, 0, ...pickedUpCups);
    currentCupIdx = (cups.indexOf(currentCupValue) + 1) % cups.length;
  }
};

const puzzle1 = (input) => {
  const cups = getCups(input);
  move(cups, 100, 9);
  return cups.join('').split('1').reverse().join('');
};

const puzzle2 = (input) => {
  const initialCups = getCups(input);
  const cups = Array.from({ length: 1_000_000 }).map((_, idx) => initialCups[idx] || idx + 1);

  move(cups, 10_000_000, 1_000_000);

  const indexOf1 = cups.indexOf(1);

  return cups[indexOf1 + 1] * cups[indexOf1 + 2];
};

module.exports = {
  puzzle1,
  puzzle2,
};
