const getInput = (input) => input.split('\n').map((row) => row.split(''));

const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const n = args[0];
    if (!(n in cache)) {
      cache[n] = fn(n);
    }
    return cache[n];
  };
};

const generateNeighbours = memoize((dimensions) => {
  const neighbours = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          if (!i && !j && !k && !l) continue;
          neighbours.push([i, j, k, l]);
        }
      }
    }
  }

  return dimensions >= 4
    ? neighbours
    : neighbours
        .filter((neighbour) => neighbour[dimensions] === 0)
        .map((neighbour) => neighbour.slice(0, dimensions));
});

const getNeighbours = (...coords) =>
  generateNeighbours(coords.length).map((modifiers) =>
    modifiers.map((modifier, idx) => modifier + coords[idx])
  );

const getCheckNeighbours = (getValue) => (...coords) =>
  getNeighbours(...coords).reduce(
    (stats, neighbour) => {
      const value = getValue(...neighbour);
      if (value === '#') {
        stats.active += 1;
      }
      return stats;
    },
    { isActive: getValue(...coords) === '#', active: 0 }
  );

const newLayersCount = (layers) => Math.floor((Object.keys(layers).length + 2) / 2);

const boot = (initialLayers, cubeActivation) => {
  let layers = initialLayers;
  let cycles = 0;
  let finalActiveCells;

  while (cycles < 6) {
    const { newLayers, activeCells } = cubeActivation(layers);
    layers = newLayers;
    finalActiveCells = activeCells;
    cycles += 1;
  }

  return finalActiveCells;
};

const puzzle1 = (input) => {
  const initialLayers = {
    0: getInput(input),
  };

  const cubeActivation = (layers) => {
    const getValue = (x, y, z) => layers?.[z]?.[y]?.[x] || '.';
    const checkNeighbours = getCheckNeighbours(getValue);
    const layersCount = newLayersCount(layers);
    const sliceSize = layers[0].length;
    const newLayers = {};
    let newActiveCellsCounter = 0;

    // this is not very reusable unfortunately, so quite a bit of copy pasting to puzzle2
    // probably more OOP approach here (i.e. a class wrapping layers with proper operators)
    // or at least extracting 2d/n-d parts would be better but ehh it works so I'll pass
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

  return boot(initialLayers, cubeActivation);
};

const puzzle2 = (input) => {
  const initialLayers = {
    0: {
      0: getInput(input),
    },
  };

  const cubeActivation = (layers) => {
    const getValue = (x, y, z, w) => layers?.[w]?.[z]?.[y]?.[x] || '.';
    const checkNeighbours = getCheckNeighbours(getValue);
    const layersCount = newLayersCount(layers);
    const sliceSize = layers[0][0].length;
    const newLayers = {};
    let newActiveCellsCounter = 0;

    for (let w = -layersCount; w <= layersCount; w++) {
      newLayers[w] = {};
      for (let z = -layersCount; z <= layersCount; z++) {
        newLayers[w][z] = [];
        for (let y = -1; y <= sliceSize; y++) {
          newLayers[w][z][y + 1] = [];
          for (let x = -1; x <= sliceSize; x++) {
            const stats = checkNeighbours(x, y, z, w);
            if (stats.isActive) {
              if (stats.active === 2 || stats.active === 3) {
                newLayers[w][z][y + 1][x + 1] = '#';
                newActiveCellsCounter += 1;
              } else {
                newLayers[w][z][y + 1][x + 1] = '.';
              }
            } else {
              if (stats.active === 3) {
                newLayers[w][z][y + 1][x + 1] = '#';
                newActiveCellsCounter += 1;
              } else {
                newLayers[w][z][y + 1][x + 1] = '.';
              }
            }
          }
        }
      }
    }

    return { newLayers, activeCells: newActiveCellsCounter };
  };

  return boot(initialLayers, cubeActivation);
};

module.exports = {
  puzzle1,
  puzzle2,
};
