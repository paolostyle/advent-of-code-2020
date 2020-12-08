const getData = (input) =>
  input.split('\n').map((op) => {
    const [, operation, val] = /^(acc|nop|jmp) ([\+\-]\d+)$/.exec(op);
    return { operation, value: parseInt(val, 10) };
  });

const runProgram = (instructions, operationCb) => {
  let accumulator = 0;
  let i = 0;
  const executedOperations = new Set();

  while (instructions[i]) {
    if (executedOperations.has(i)) {
      return { result: accumulator, earlyExit: true };
    } else {
      executedOperations.add(i);
    }

    const { operation, value } = instructions[i];

    if (operation === 'acc') {
      accumulator += value;
      i += 1;
    }
    if (operation === 'nop') {
      i += 1;
    }
    if (operation === 'jmp') {
      i += value;
    }

    if (operationCb) {
      operationCb(instructions[i], i);
    }
  }

  return { result: accumulator, earlyExit: false };
};

const puzzle1 = (input) => {
  const data = getData(input);
  return runProgram(data).result;
};

const puzzle2 = (input) => {
  const data = getData(input);
  const usedIndexes = new Set();

  runProgram(data, (_, i) => usedIndexes.add(i));

  for (const [idx, { operation, value }] of data.entries()) {
    if (operation === 'acc' || !usedIndexes.has(idx)) continue;

    const modifiedData = [
      ...data.slice(0, idx),
      { operation: operation === 'jmp' ? 'nop' : 'jmp', value },
      ...data.slice(idx + 1),
    ];

    const { result, earlyExit } = runProgram(modifiedData);
    if (!earlyExit) return result;
  }
};

module.exports = {
  puzzle1,
  puzzle2,
};
