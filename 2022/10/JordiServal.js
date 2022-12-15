const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .split("\n").map(x => x.split(' '))

const intructions = {
  'addx': {ticks: 1, value: 1},
  'noop': {ticks: 0, value: 0},
}

const receiveSignal = (signal) => {
  let currentSignal, currentInstruction, sum = 1, totalSum = 0, crt = ''
  for(let i = 1; i <= 240; i++) {
    if(!currentSignal) {
      currentSignal = signal.shift()
      if(currentSignal) {
        currentInstruction = {...intructions[currentSignal[0]]}
        currentInstruction.value = parseInt(currentSignal[1]) || 0
        currentInstruction.name = currentSignal[0]
      }
    }
    if((i % 40) -1 >= sum-1 && (i % 40) -1 <= sum+1) { 
      crt += '#'
    } else {
      crt += ' '
    }
    if(i % 40 === 0) {
      crt += '\n'
    }
    if((i - 20) % 40 === 0) {
      totalSum += sum * i
    }
    if(currentInstruction) {
      if(currentInstruction.ticks > 0) {
        currentInstruction.ticks--
      } else {
        sum += currentInstruction.value
        currentSignal = null
        currentInstruction = null
      }
    }
  }
  console.log(crt)

  return totalSum
}

const part1 = receiveSignal(input)
const part2 = ''

console.log({part1, part2})