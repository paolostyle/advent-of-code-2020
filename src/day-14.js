const getInput = (input) => input.split('\n');

const parseLine = (line) => {
  const [type, value] = line.split(' = ');
  if (type === 'mask') {
    return { type, value };
  } else {
    const [, address] = /mem\[(\d+)]/.exec(type);
    return { type: 'mem', address, value };
  }
};

const toBinary = (decString, length = 36) =>
  parseInt(decString, 10).toString(2).padStart(length, '0');

const getMaskedValue = (dec, mask) => {
  const binary = toBinary(dec);

  return parseInt(
    mask.replace(/X/g, (_, idx) => binary[idx]),
    2
  );
};

const getAddresses = (address, mask) => {
  const binary = toBinary(address);
  const newAddress = mask.replace(/0/g, (_, idx) => binary[idx]);
  const floatingBits = newAddress.replace(/[^X]/g, '').length;

  return Array.from({ length: Math.pow(2, floatingBits) }).map((_, i) => {
    const binaryIndex = toBinary(i, floatingBits).split('');
    return parseInt(
      newAddress.replace(/X/g, () => binaryIndex.pop()),
      2
    );
  });
};

const sumValues = (state) =>
  Object.entries(state)
    .filter(([key]) => key !== 'mask')
    .reduce((sum, [, value]) => sum + value, 0);

const reducer = (memHandler) => (state, line) => {
  const { type, value, address } = parseLine(line);
  if (type === 'mask') state.mask = value;
  if (type === 'mem') memHandler({ state, address, value });
  return state;
};

const puzzle1 = (input) => {
  const endState = getInput(input).reduce(
    reducer(({ state, address, value }) => {
      state[address] = getMaskedValue(value, state.mask);
    }),
    {}
  );

  return sumValues(endState);
};

const puzzle2 = (input) => {
  const endState = getInput(input).reduce(
    reducer(({ state, address, value }) => {
      getAddresses(address, state.mask).forEach((newAddress) => {
        state[newAddress] = parseInt(value, 10);
      });
    }),
    {}
  );

  return sumValues(endState);
};

module.exports = {
  puzzle1,
  puzzle2,
};
