const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .split("\n").map(x => x.split(' '))

const intructions = {
  'addx': 2,
  'noop': 1
}

const part1 = ''
const part2 = ''

console.log({part1, part2})