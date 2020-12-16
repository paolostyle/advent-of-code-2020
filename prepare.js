const fs = require('fs');
const https = require('https');

try {
  if (!Number(process.argv[2])) throw new Error('You must provide a day!');
  if (!fs.existsSync('cookie.txt')) throw new Error('You must have a cookie.txt file!');
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const day = process.argv[2];
const cookie = fs.readFileSync('cookie.txt', 'utf-8');
const template = `const getInput = (input) => input.split('\\n');

const puzzle1 = (input) => {};

const puzzle2 = (input) => {};

module.exports = {
  puzzle1,
  puzzle2,
};
`;

const sourceFilename = `src/day-${day}.js`;
if (fs.existsSync(sourceFilename)) {
  console.log(`${sourceFilename} already exists, skipping`);
} else {
  fs.writeFileSync(sourceFilename, template);
  console.log(`Created template file in ${sourceFilename}`);
}

if (!fs.existsSync('inputs')) {
  fs.mkdirSync('inputs');
}

console.log('Downloading input file...');
https
  .get(`https://adventofcode.com/2020/day/${day}/input`, { headers: { cookie } }, (response) => {
    let buffer = '';
    response.on('data', (chunk) => {
      buffer += chunk;
    });
    response.on('end', () => {
      const filename = `inputs/day-${day}.txt`;
      const str = buffer.trim();
      fs.writeFileSync(filename, str);
      console.log(`Input data saved to ${filename}`);
    });
  })
  .end();
