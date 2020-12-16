const getInput = (input) => {
  const [rulesRaw, myTicketRaw, nearbyTicketsRaw] = input.split('\n\n');

  const rules = rulesRaw.split('\n').map((rule) => {
    const [
      ,
      ruleName,
      lowerRange1,
      upperRange1,
      lowerRange2,
      upperRange2,
    ] = /^([\w\s]+): (\d+)-(\d+) or (\d+)-(\d+)$/.exec(rule);

    return {
      ruleName,
      range1: [Number(lowerRange1), Number(upperRange1)],
      range2: [Number(lowerRange2), Number(upperRange2)],
      validIndexes: [],
    };
  });

  const myTicket = myTicketRaw.split('\n')[1].split(',').map(Number);
  const nearbyTickets = nearbyTicketsRaw
    .split('\n')
    .slice(1)
    .map((ticket) => ticket.split(',').map(Number));

  return { rules, myTicket, nearbyTickets };
};

const isInRange = (number, range) => number >= range[0] && number <= range[1];

const isNumberValidForRule = (number) => ({ range1, range2 }) =>
  isInRange(number, range1) || isInRange(number, range2);

const isNumberValidForAnyRule = (number, rules) => rules.some(isNumberValidForRule(number));

const puzzle1 = (input) => {
  const { rules, nearbyTickets } = getInput(input);

  return nearbyTickets.reduce(
    (totalErrorRate, ticket) =>
      totalErrorRate +
      ticket.reduce(
        (errorRate, number) =>
          isNumberValidForAnyRule(number, rules) ? errorRate : errorRate + number,
        0
      ),
    0
  );
};

const transposeArray = (array) => array[0].map((_, colIndex) => array.map((row) => row[colIndex]));

const puzzle2 = (input) => {
  const { rules, myTicket, nearbyTickets } = getInput(input);

  const filteredTickets = nearbyTickets.filter((ticket) =>
    ticket.every((number) => isNumberValidForAnyRule(number, rules))
  );

  transposeArray(filteredTickets).forEach((numbersOfType, idx) => {
    rules.forEach((rule) => {
      if (numbersOfType.every((number) => isNumberValidForRule(number)(rule))) {
        rule.validIndexes.push(idx);
      }
    });
  });

  rules
    .sort((a, b) => a.validIndexes.length - b.validIndexes.length)
    .forEach((outerRule, outerIdx) => {
      rules.forEach((innerRule, innerIdx) => {
        if (outerIdx !== innerIdx) {
          const idx = innerRule.validIndexes.indexOf(outerRule.validIndexes[0]);
          if (idx !== -1) {
            innerRule.validIndexes.splice(idx, 1);
          }
        }
      });
    });

  return rules
    .filter(({ ruleName }) => ruleName.includes('departure'))
    .reduce((result, { validIndexes }) => result * myTicket[validIndexes[0]], 1);
};

module.exports = {
  puzzle1,
  puzzle2,
};
