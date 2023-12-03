const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.trim().split('\n').map(order => order.split(' '))


const part1 = parse(input)
const part2 = ''

console.log({part1, part2})
