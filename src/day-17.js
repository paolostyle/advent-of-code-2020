const getInput = (input) => input.split('\n').map((row) => row.split(''));

const getNeighbours = (x, y, z) => {
  const layer = (zDim) => [
    [x - 1, y, zDim],
    [x - 1, y + 1, zDim],
    [x - 1, y - 1, zDim],
    [x + 1, y, zDim],
    [x + 1, y + 1, zDim],
    [x + 1, y - 1, zDim],
    [x, y + 1, zDim],
    [x, y - 1, zDim],
    ...(zDim === z ? [] : [[x, y, zDim]]),
  ];

  return [...layer(z - 1), ...layer(z), ...layer(z + 1)];
};

const getCheckNeighbours = (getValue) => (x, y, z) =>
  getNeighbours(x, y, z).reduce(
    (stats, neighbour) => {
      const value = getValue(...neighbour);
      if (value === '#') {
        stats.active += 1;
      }
      return stats;
    },
    { isActive: getValue(x, y, z) === '#', active: 0 }
  );

const format = (x, y, z) => (...rest) => console.log(`x=${x}, y=${y}, z=${z}:`, ...rest);

const algorithm = (layers) => {
  const getValue = (x, y, z) => layers?.[z]?.[y]?.[x] || '.';
  const checkNeighbours = getCheckNeighbours(getValue);

  const layersCount = Math.floor((Object.keys(layers).length + 2) / 2);
  const sliceSize = layers[0].length;
  const newLayers = {};
  let newActiveCellsCounter = 0;

  for (let z = -layersCount; z <= layersCount; z++) {
    newLayers[z] = [];
    for (let y = -1; y <= sliceSize; y++) {
      newLayers[z][y + 1] = [];
      for (let x = -1; x <= sliceSize; x++) {
        const stats = checkNeighbours(x, y, z);
        if (stats.isActive) {
          if (stats.active === 2 || stats.active === 3) {
            newLayers[z][y + 1][x + 1] = '#';
            newActiveCellsCounter += 1;
          } else {
            newLayers[z][y + 1][x + 1] = '.';
          }
        } else {
          if (stats.active === 3) {
            newLayers[z][y + 1][x + 1] = '#';
            newActiveCellsCounter += 1;
          } else {
            newLayers[z][y + 1][x + 1] = '.';
          }
        }
      }
    }
  }

  return { newLayers, activeCells: newActiveCellsCounter };
};

const puzzle1 = (input) => {
  let layers = {
    0: getInput(input),
  };

  let cycles = 0;
  let finalActiveCells;

  while (cycles < 6) {
    const { newLayers, activeCells } = algorithm(layers);
    layers = newLayers;
    finalActiveCells = activeCells;
    cycles += 1;
  }

  return finalActiveCells;
};

const puzzle2 = (input) => {

};

module.exports = {
  puzzle1,
  puzzle2,
};
