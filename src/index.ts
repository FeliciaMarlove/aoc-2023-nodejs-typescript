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
  doDay1(`${inputFileBase}/Day01_test.txt`)
  doDay1(`${inputFileBase}/Day01.txt`)
});

function doDay1(input: string) {
  let sum = 0;

  const lineReader = createLineReader(input);
  lineReader.on('line',
    (line: string) => {

    // First solution
    //   let calibration = Number(line.replace(/\D/g, ''));
    //   if (calibration < 10) {
    //     calibration = Number(`${calibration}${calibration}`);
    //   } else if (calibration > 99) {
    //     calibration = Number(`${calibration.toString()[0]}${calibration.toString()[calibration.toString().length -1]}`);
    //   }
    //   sum += calibration;

      //Better solution
      let digitsRepresentation = line.replace(/\D/g, '');
      let calibration = `${digitsRepresentation[0]}${digitsRepresentation[digitsRepresentation.length - 1]}`;
      sum += Number(calibration);
    });

  lineReader.on('close', () => outputResult(input, sum));

}

function doDay4(input: string) {

  let totalPoints = 0;

  const lineReader = createLineReader(input);
  lineReader.on('line',
    (line: string) => {
      const winningNumbers = line.split(':')[1].split('|')[0].split(' ').filter(Number);
      const myNumbers = line.split('|')[1].split(' ').filter(Number);

      const set = [...new Set([...winningNumbers, ...myNumbers])];
      const cardPoints = winningNumbers.length + myNumbers.length - set.length;

      totalPoints += cardPoints > 1 ? (Math.pow(2, cardPoints - 1)) : cardPoints;

    });

  lineReader.on('close', () =>
    outputResult(input, totalPoints));
}

function outputResult(input: string, result: any) {
  console.log(`${input.includes('test') ? `Test data` : `Actual data` } - Answer: ${result}`)
}
