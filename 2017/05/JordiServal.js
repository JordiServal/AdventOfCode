const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => i.split('\n').map(row => parseInt(row))

const countSteps = (ladder) => {
  let steps = 0, index = 0
  while(index < ladder.length && index >= 0) {
    const aux = ladder[index]
    ladder[index] += 1
    index = index + aux
    steps++
  }

  return steps
}

const countSteps2 = (ladder) => {
  let steps = 0, index = 0
  while(index < ladder.length && index >= 0) {
    const aux = ladder[index]
    ladder[index] += aux < 3 ? 1 : -1
    index = index + aux
    steps++
  }

  return steps
}

const part1 = countSteps(parse(input))
const part2 = countSteps2(parse(input))

console.log({part1, part2})