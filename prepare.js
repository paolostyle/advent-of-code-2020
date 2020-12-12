const fs = require('fs');
const https = require('https');

const day = process.argv[2];
const cookie = fs.readFileSync('cookie.txt', 'utf-8');
const template = `const puzzle1 = (input) => {};

const puzzle2 = (input) => {};

module.exports = {
  puzzle1,
  puzzle2,
};
`;

fs.writeFileSync(`src/day-${day}.js`, template);

https
  .request(
    {
      host: 'adventofcode.com',
      path: `/2020/day/${day}/input`,
      method: 'GET',
      headers: { cookie },
    },
    (response) => {
      let buffer;
      response.on('data', (chunk) => {
        buffer = chunk;
      });
      response.on('end', function () {
        const str = buffer.toString('utf8').trim();
        fs.writeFileSync(`inputs/day-${day}.txt`, str);
      });
    }
  )
  .end();
