const getInstructions = (input) => input.split('\n');

const parseInstruction = (instruction) => {
  const parseResult = /^([E|W|N|S|L|R|F])(\d+)$/.exec(instruction);
  const action = parseResult[1];
  const value = parseInt(parseResult[2], 10);
  return { action, value };
};

const handleInstruction = (instruction, { onForward, onDirection, onRotate }) => {
  const { action, value } = parseInstruction(instruction);

  if (action === 'F') {
    return onForward(value);
  }
  if (['E', 'W', 'N', 'S'].includes(action)) {
    return onDirection(action, value);
  }
  if (['L', 'R'].includes(action)) {
    return onRotate(action, value);
  }
};

const move = ({ position, direction, value }) => {
  if (direction === 'E') return [position[0] + value, position[1]];
  if (direction === 'W') return [position[0] - value, position[1]];
  if (direction === 'N') return [position[0], position[1] + value];
  if (direction === 'S') return [position[0], position[1] - value];
};

const getNewDirection = ({ direction, turn, degrees }) => {
  const rightTurnDegrees = turn === 'L' ? 360 - degrees : degrees;
  const order = ['N', 'E', 'S', 'W'];
  const newIndex = (order.indexOf(direction) + rightTurnDegrees / 90) % 4;
  return order[newIndex];
};

const waypointToCoords = (waypoint) => [
  [waypoint[0] >= 0 ? 'E' : 'W', Math.abs(waypoint[0])],
  [waypoint[1] >= 0 ? 'N' : 'S', Math.abs(waypoint[1])],
];

const getManhattanDistance = (position) => Math.abs(position[0]) + Math.abs(position[1]);

const puzzle1 = (input) => {
  const result = getInstructions(input).reduce(
    ({ position, direction }, instruction) =>
      handleInstruction(instruction, {
        onForward: (value) => ({ position: move({ position, direction, value }), direction }),
        onDirection: (moveDirection, value) => ({
          position: move({ position, direction: moveDirection, value }),
          direction,
        }),
        onRotate: (turn, degrees) => ({
          position,
          direction: getNewDirection({ direction, turn, degrees }),
        }),
      }),
    {
      position: [0, 0],
      direction: 'E',
    }
  );

  return getManhattanDistance(result.position);
};

const puzzle2 = (input) => {
  const result = getInstructions(input).reduce(
    ({ position, waypoint }, instruction) =>
      handleInstruction(instruction, {
        onForward: (multiplier) => ({
          position: waypointToCoords(waypoint).reduce(
            (newPosition, [direction, baseValue]) =>
              move({ position: newPosition, value: baseValue * multiplier, direction }),
            position
          ),
          waypoint,
        }),
        onDirection: (direction, value) => ({
          position,
          waypoint: move({ position: waypoint, direction, value }),
        }),
        onRotate: (turn, degrees) => ({
          position,
          waypoint: waypointToCoords(waypoint).reduce(
            (newWaypoint, [direction, value]) =>
              move({
                position: newWaypoint,
                value,
                direction: getNewDirection({ direction, turn, degrees }),
              }),
            [0, 0]
          ),
        }),
      }),
    {
      position: [0, 0],
      waypoint: [10, 1],
    }
  );

  return getManhattanDistance(result.position);
};

module.exports = {
  puzzle1,
  puzzle2,
};
