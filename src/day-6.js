const sumGroupCount = (input, mapFn) =>
  input
    .split('\n\n')
    .map(mapFn)
    .reduce((totalSum, groupCount) => totalSum + groupCount);

const puzzle1 = (input) =>
  sumGroupCount(input, (group) =>
    Object.values(
      group
        .replace(/\s/g, '')
        .split('')
        .reduce((charMap, char) => {
          charMap[char] = 1;
          return charMap;
        }, {})
    ).reduce((sum, charCounted) => sum + charCounted)
  );

const puzzle2 = (input) =>
  sumGroupCount(input, (group) => {
    const persons = group.split('\n');
    const answersCount = persons.reduce((acc, person) => {
      person.split('').forEach((answer) => (acc[answer] = acc[answer] ? acc[answer] + 1 : 1));
      return acc;
    }, {});
    return Object.values(answersCount).filter((answers) => answers === persons.length).length;
  });

module.exports = {
  puzzle1,
  puzzle2,
};
