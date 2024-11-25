const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse= (i) => i.split('\n').map(line => parseInt(line.split(' ').pop()))
const getValueA = v => v * 16807 % 2147483647
const getValueB = v => v * 48271 % 2147483647

const generateValue = lastValues => {
  const binaries = []
  let matches = 0
  for(let i=0;i<5;i++) {
    lastValues[0] = getValueA(lastValues[0])
    lastValues[1] = getValueB(lastValues[1])
    binaries[0] = lastValues[0].toString(2).padStart(32, "0").substr(16)
    binaries[1] = lastValues[1].toString(2).padStart(32, "0").substr(16)
    if(binaries[0] === binaries[1]) matches++
  }
  return matches
}

const generatePickyValue = lastValues => {
  const binaries = []
  let matches = 0
  for(let i=0;i<5000000;i++) {
    do {
    lastValues[0] = getValueA(lastValues[0])
    } while (lastValues[0] % 4 !== 0)
    do {
      lastValues[1] = getValueB(lastValues[1])
    } while (lastValues[1] % 8 !== 0)
      binaries[0] = lastValues[0].toString(2).padStart(32, "0").substr(16)
      binaries[1] = lastValues[1].toString(2).padStart(32, "0").substr(16)
    if(binaries[0] === binaries[1]) matches++
  }
  return matches
}

const part1 = generateValue(parse(input))
const part2 = generatePickyValue(parse(input))
console.log({part1, part2})