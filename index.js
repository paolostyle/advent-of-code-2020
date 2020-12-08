const fs = require('fs');

const [, , dayToRun, puzzleToRun] = process.argv;
const daySolution = require(`./src/day-${dayToRun}.js`);
const dayInput = fs.readFileSync(`./inputs/day-${dayToRun}.txt`, {
  encoding: 'utf-8',
});

console.time('Execution time');
const puzzleResult = daySolution[`puzzle${puzzleToRun}`](dayInput);
console.timeEnd('Execution time');

console.log('Result:', puzzleResult);
