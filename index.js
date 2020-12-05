const fs = require('fs');

const [, , dayToRun, puzzleToRun] = process.argv;
const daySolution = require(`./day-${dayToRun}.js`);
const dayInput = fs.readFileSync(`./inputs/day-${dayToRun}.txt`, { encoding: 'utf-8' });
const puzzleResult = daySolution[`puzzle${puzzleToRun}`](dayInput);

console.log(puzzleResult);
