const getInput = (input) => input.split('\n');

const euclid = (a, b) => {
  if (a === 0n) {
    return { gcd: b, x: 0n, y: 1n };
  }

  let { gcd, x: prevX, y: prevY } = euclid(b % a, a);

  const x = prevY - (b / a) * prevX;
  const y = prevX;

  return { gcd, x, y };
};

const positiveRemainder = (calculatedRemainder, value) =>
  calculatedRemainder % value >= 0
    ? calculatedRemainder % value
    : value + (calculatedRemainder % value);

const puzzle1 = (input) => {
  const [timestamp, buses] = getInput(input);
  const [busToPick] = buses
    .split(',')
    .filter((item) => item !== 'x')
    .map((busId) => ({ busId, minutesToWait: busId - (timestamp % busId) }))
    .sort((a, b) => a.minutesToWait - b.minutesToWait);

  return busToPick.busId * busToPick.minutesToWait;
};

// I kind of "cheated" - I tried to solve it by myself but couldn't find an optimized way to do so,
// but I found a clue on Reddit about Chinese remainder theorem and used it to implement this solution,
// however I didn't check any other solutions
// this one was a nightmare overall but I guess I learned something
const puzzle2 = (input) => {
  const buses = getInput(input)[1]
    .split(',')
    .map((value, offset) => ({
      value: value !== 'x' ? BigInt(value) : 'x',
      offset: BigInt(offset),
    }))
    .filter(({ value }) => value !== 'x')
    .map(({ value, offset }) => ({
      divisor: value,
      remainder: positiveRemainder(value - offset, value),
    }));

  // for my input this was larger than 2^32 hence BigInts everywhere
  // it works with regular numbers for smaller inputs
  const divisorProduct = buses.reduce((total, { divisor }) => total * divisor, 1n);

  const chineseRemainder = buses.reduce((acc, { remainder, divisor }) => {
    const bigN = divisorProduct / divisor;
    const { y } = euclid(divisor, bigN);
    return acc + bigN * y * remainder;
  }, 0n);

  return Number(positiveRemainder(chineseRemainder, divisorProduct));
};

module.exports = {
  puzzle1,
  puzzle2,
};
