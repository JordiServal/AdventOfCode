const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parseInput = (input) => {
  return input.split("$ ").map((command) => command.split('\n').map((line) => line.trim().split(' ')))
}  

const createStructure = (commands) => {
  commands.shift()
  return commands.reduce((struc, cmd) => {
    const [[order, args], ] = cmd
    console.log(cmd, order, args)
  }, {})
}

const commands = parseInput(input)

const part1 = createStructure(commands)
const part2 = ''


console.log({part1, part2})