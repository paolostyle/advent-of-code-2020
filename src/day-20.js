const getTiles = (input) =>
  input.split('\n\n').map((tile) => {
    const tileId = Number(/Tile (\d{4}):/.exec(tile.split('\n')[0])[1]);
    const fullTile = tile
      .split('\n')
      .slice(1)
      .map((row) => row.split(''));

    return { tileId, fullTile };
  });

const getBorders = (tile) => {
  const topBorder = tile[0].join('');
  const rightBorder = tile.map((row) => row[9]).join('');
  const bottomBorder = tile[9].join('');
  const leftBorder = tile.map((row) => row[0]).join('');

  return [topBorder, rightBorder, bottomBorder, leftBorder];
};

const rotate = (tile, rotations) => {
  let newTile = tile;
  for (let i = 0; i < rotations; i++) {
    newTile = newTile[0].map((_, index) => newTile.map((row) => row[index]).reverse());
  }
  return newTile;
};

const flip = (tile, type) => {
  if (type === 0) return tile.slice().reverse();
  if (type === 1) return tile.map((row) => row.slice().reverse());
};

// these cover all possible configurations:
// 0 === initial
// 1 === vertical flip
// 2 === horizontal flip
// 3 === rotate right
// 4 === rotate 180 deg
// 5 === rotate left
// 6 === vertical flip + rotate right
// 7 === vertical flip + rotate left
const manipulate = (tile, type) => {
  switch (type) {
    case 0:
      return tile;
    case 1:
      return flip(tile, 0);
    case 2:
      return flip(tile, 1);
    case 3:
      return rotate(tile, 1);
    case 4:
      return rotate(tile, 2);
    case 5:
      return rotate(tile, 3);
    case 6:
      return rotate(flip(tile, 0), 1);
    case 7:
      return rotate(flip(tile, 0), 3);
  }
};

const match = (input) => {
  const tiles = getTiles(input);
  const stats = tiles.reduce((acc, { tileId }) => {
    acc[tileId] = [null, null, null, null];
    return acc;
  }, {});

  for (let i = 0; i < tiles.length; i++) {
    const mainTile = tiles[i];
    const borders = getBorders(mainTile.fullTile);
    for (let b = 0; b < 4; b++) {
      checkerLoop: for (let j = i + 1; j < tiles.length; j++) {
        const tile = tiles[j];
        for (let m = 0; m < 8; m++) {
          const modifiedTile = manipulate(tile.fullTile, m);
          const modifiedTileBorders = getBorders(modifiedTile);
          const borderId = modifiedTileBorders.findIndex((border) => border === borders[b]);
          if (borderId !== -1) {
            stats[mainTile.tileId][b] = [tile.tileId, m, borderId];
            stats[tile.tileId][borderId] = [mainTile.tileId, 0, b];
            break checkerLoop;
          }
        }
      }
    }
  }

  return stats;
};

const puzzle1 = (input) => {
  const stats = match(input)

  return Number(
    Object.entries(stats)
      .filter(([, values]) => values.filter((value) => value === null).length > 1)
      .reduce((result, [id]) => result * Number(id), 1)
  );
};

const puzzle2 = (input) => {};

module.exports = {
  puzzle1,
  puzzle2,
};
