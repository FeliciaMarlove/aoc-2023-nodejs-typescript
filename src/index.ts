import express from 'express';
import fs from 'fs';
import readline from 'readline';

const app = express();
const inputFileBase = 'src/resources';

// app.get('/', (req, res) => {
//   res.send('aoc');
// });

function createLineReader(filePath: string) {
  return readline.createInterface({
    input: fs.createReadStream(filePath)
  });
}

app.listen(8089, () => {
  // doDay4(`${inputFileBase}/Day04_test.txt`)
  // doDay4(`${inputFileBase}/Day04.txt`)
});

function doDay4(input: string) {

  let totalPoints = 0;

  const linerReader = createLineReader(input);
  linerReader.on('line',
    (line: String) => {
      const winningNumbers = line.split(':')[1].split('|')[0].split(' ').filter(Number);
      const myNumbers = line.split('|')[1].split(' ').filter(Number);

      const set = [...new Set([...winningNumbers, ...myNumbers])];
      const cardPoints = winningNumbers.length + myNumbers.length - set.length;

      totalPoints += cardPoints > 1 ? (Math.pow(2, cardPoints - 1)) : cardPoints;

    });

  linerReader.on('close', () =>
    console.log(`${input.includes('test') ? `Test data` : `Actual data` } - Answer: ${totalPoints}`));
}
