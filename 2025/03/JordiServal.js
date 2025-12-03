const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse= (i) => i.split('\n').map(l => l.split('').map(Number))

const getJoltage = (banks, digits) => {
  return banks.reduce((acc, curr) => {
    const bankJoltage = []
    for(let i = digits; i > 0; --i) {
      const aux = curr.slice(0, curr.length-i+1)
      let max = Math.max(...aux)
      curr = curr.slice(curr.indexOf(max) + 1)
      bankJoltage.push(max)
    }
    return acc + parseInt(bankJoltage.join(''))
  }, 0)
}

const part1 = getJoltage(parse(input), 2)
const part2 = getJoltage(parse(input), 12)

console.log({part1, part2})