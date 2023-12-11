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
        if(char && char.match(/\d+/)){
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
        } else {
          if(currentNumber.valid) engineParts.push(parseInt(currentNumber.numbers.join('')))
          currentNumber.numbers = []
          currentNumber.valid = false
        } 
      }) 
      if(currentNumber.valid) engineParts.push(parseInt(currentNumber.numbers.join('')))
      currentNumber.numbers = []
      currentNumber.valid = false
  });
  console.log(engineParts.join(' '))
  return engineParts.reduce((acc, curr) => acc + curr)
}

const getEngineRatioSum = engine => {
  const engineParts = {}, currentNumber = {numbers: [], valid: false}
  const symbols = engine.map(r => r.map(c => c && !c.match(/\d+/) ? c : false))
  engine.forEach((row, indexRow) => {
    row.forEach((char, indexCol) => {
        if(char && char.match(/\d+/)){
          currentNumber.numbers.push(char)
          if(symbols[indexRow - 1] && symbols[indexRow - 1][indexCol - 1]) currentNumber.valid = `${indexRow-1}-${indexCol-1}-${symbols[indexRow - 1][indexCol - 1]}`
          else if(symbols[indexRow - 1] && symbols[indexRow - 1][indexCol]) currentNumber.valid = `${indexRow-1}-${indexCol}-${symbols[indexRow - 1][indexCol]}`
          else if(symbols[indexRow - 1] && symbols[indexRow - 1][indexCol + 1]) currentNumber.valid = `${indexRow-1}-${indexCol+1}-${symbols[indexRow - 1][indexCol + 1]}`
          else if(symbols[indexRow][indexCol - 1]) currentNumber.valid = `${indexRow}-${indexCol-1}-${symbols[indexRow][indexCol - 1]}`
          else if(symbols[indexRow][indexCol + 1]) currentNumber.valid = `${indexRow}-${indexCol+1}-${symbols[indexRow][indexCol + 1]}`
          else if(symbols[indexRow + 1] && symbols[indexRow + 1][indexCol - 1]) currentNumber.valid = `${indexRow +1}-${indexCol-1}-${symbols[indexRow + 1][indexCol - 1]}`
          else if(symbols[indexRow + 1] && symbols[indexRow + 1][indexCol]) currentNumber.valid = `${indexRow +1}-${indexCol}-${symbols[indexRow + 1][indexCol]}`
          else if(symbols[indexRow + 1] && symbols[indexRow + 1][indexCol + 1]) currentNumber.valid = `${indexRow +1}-${indexCol+1}-${symbols[indexRow + 1][indexCol + 1]}`
        } else {
          if(currentNumber.valid) {
            if(!engineParts[currentNumber.valid]) engineParts[currentNumber.valid] = []
            engineParts[currentNumber.valid].push(parseInt(currentNumber.numbers.join('')))
          } 
          currentNumber.numbers = []
          currentNumber.valid = false
        } 
      }) 
      if(currentNumber.valid) {
        if(!engineParts[currentNumber.valid]) engineParts[currentNumber.valid] = []
        engineParts[currentNumber.valid].push(parseInt(currentNumber.numbers.join('')))
        currentNumber.numbers = []
        currentNumber.valid = false
      }
  });
  return Object.values(engineParts).filter(parts => parts.length === 2).reduce((acc, curr) => acc + curr[0] * curr[1], 0)
}

const part1 = getEngineSum(parse(input))
const part2 = getEngineRatioSum(parse(input))


console.log({part1, part2})
