const getInput = (input) => input.split('\n');

const puzzle1 = (input) => {
  const [timestamp, buses] = getInput(input);
  const [busToPick] = buses
    .split(',')
    .filter((item) => item !== 'x')
    .map((busId) => ({ busId, minutesToWait: busId - (timestamp % busId) }))
    .sort((a, b) => a.minutesToWait - b.minutesToWait);

  return busToPick.busId * busToPick.minutesToWait;
};

const puzzle2 = () => {
  console.log("can't solve it")
  return 0;
}

module.exports = {
  puzzle1,
  puzzle2,
};
