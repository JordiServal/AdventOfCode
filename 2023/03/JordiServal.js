const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(x => x.trim().split('').map(c => c === '.' ? false : c))

const getEngineSum = engine => {
  const engineParts = [], currentNumber = {numbers: [], valid: false}
  const symbols = engine.map(r => r.map(c => c && !c.match(/\d+/) ? true : false))
  engine.forEach((row, indexRow) => {
    row.forEach((char, indexCol) => {
      if(!char) {
        if(currentNumber.valid) engineParts.push(parseInt(currentNumber.numbers.join('')))
        currentNumber.numbers = []
        currentNumber.valid = false
      } else if(char.match(/\d+/)){
        currentNumber.numbers.push(char)
        if(
          symbols[indexRow - 1] && symbols[indexRow - 1][indexCol -1] ||
          symbols[indexRow - 1] && symbols[indexRow - 1][indexCol] ||
          symbols[indexRow - 1] && symbols[indexRow - 1][indexCol + 1] ||
          symbols[indexRow][indexCol - 1] ||
          symbols[indexRow][indexCol + 1] ||
          symbols[indexRow + 1] && symbols[indexRow + 1][indexCol - 1] ||
          symbols[indexRow + 1] && symbols[indexRow + 1][indexCol] ||
          symbols[indexRow + 1] && symbols[indexRow + 1][indexCol + 1]
        ) {
          currentNumber.valid = true
        }
      }
    }) 
  });
  if(currentNumber.valid) engineParts.push(parseInt(currentNumber.numbers.join('')))
  return engineParts.reduce((acc, curr) => acc + curr)
}

const part1 = getEngineSum(parse(input))
const part2 = ''


console.log({part1, part2})
