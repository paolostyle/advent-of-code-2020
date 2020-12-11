const getBoatSchema = (input) => input.split('\n').map((row) => row.split(''));

const getCheckSeat = (tolerance, getSeatsToCheck) => (boat, rowId, seatId) => {
  const seat = boat[rowId][seatId];
  if (seat === '.') return '.';

  const seatsToCheck = getSeatsToCheck(boat, rowId, seatId);

  if (seat === 'L') {
    return seatsToCheck.every((seat) => seat !== '#') ? '#' : 'L';
  }
  if (seat === '#') {
    return seatsToCheck.filter((seat) => seat === '#').length >= tolerance ? 'L' : '#';
  }
};

const getAdjacentSeats = (boat, rowId, seatId) => [
  boat[rowId][seatId - 1],
  boat[rowId][seatId + 1],
  boat?.[rowId - 1]?.[seatId - 1],
  boat?.[rowId - 1]?.[seatId],
  boat?.[rowId - 1]?.[seatId + 1],
  boat?.[rowId + 1]?.[seatId - 1],
  boat?.[rowId + 1]?.[seatId],
  boat?.[rowId + 1]?.[seatId + 1],
];

const getVisibleSeats = (boat, rowId, seatId) => {
  const maxIterator = Math.max(boat[0].length - seatId, seatId, rowId, boat.length - rowId);
  let visibleSeats = ['.', '.', '.', '.', '.', '.', '.', '.'];
  let i = 1;

  while (i < maxIterator) {
    visibleSeats = [
      ['#', 'L'].includes(visibleSeats[0]) ? visibleSeats[0] : boat?.[rowId]?.[seatId - i],
      ['#', 'L'].includes(visibleSeats[1]) ? visibleSeats[1] : boat?.[rowId]?.[seatId + i],
      ['#', 'L'].includes(visibleSeats[2]) ? visibleSeats[2] : boat?.[rowId - i]?.[seatId - i],
      ['#', 'L'].includes(visibleSeats[3]) ? visibleSeats[3] : boat?.[rowId - i]?.[seatId],
      ['#', 'L'].includes(visibleSeats[4]) ? visibleSeats[4] : boat?.[rowId - i]?.[seatId + i],
      ['#', 'L'].includes(visibleSeats[5]) ? visibleSeats[5] : boat?.[rowId + i]?.[seatId - i],
      ['#', 'L'].includes(visibleSeats[6]) ? visibleSeats[6] : boat?.[rowId + i]?.[seatId],
      ['#', 'L'].includes(visibleSeats[7]) ? visibleSeats[7] : boat?.[rowId + i]?.[seatId + i],
    ];
    i += 1;
  }

  return visibleSeats;
};

const isSeatingDifferent = (previous, current) => {
  if (!previous) return true;

  for (let i = 0; i < previous.length; i++) {
    for (let j = 0; j < previous[i].length; j++) {
      if (previous[i][j] !== current[i][j]) {
        return true;
      }
    }
  }
  return false;
};

const calculateOccupiedSeats = (initialBoat, checkSeat) => {
  let currentBoat = initialBoat;
  let previousBoat;

  let i = 0;

  while (isSeatingDifferent(previousBoat, currentBoat)) {
    previousBoat = currentBoat;
    currentBoat = currentBoat.reduce(
      (newBoat, row, rowId, oldBoat) => [
        ...newBoat,
        row.reduce((newRow, _, seatId) => {
          const newSeatValue = checkSeat(oldBoat, rowId, seatId);
          return [...newRow, newSeatValue];
        }, []),
      ],
      []
    );
  }

  return currentBoat.reduce((total, row) => {
    return total + row.reduce((subtotal, seat) => (seat === '#' ? ++subtotal : subtotal), 0);
  }, 0);
};

const puzzle1 = (input) => {
  const initialData = getBoatSchema(input);
  const checkSeat = getCheckSeat(4, getAdjacentSeats);

  return calculateOccupiedSeats(initialData, checkSeat);
};

const puzzle2 = (input) => {
  const initialData = getBoatSchema(input);
  const checkSeat = getCheckSeat(5, getVisibleSeats);

  return calculateOccupiedSeats(initialData, checkSeat);
};

module.exports = {
  puzzle1,
  puzzle2,
};
