const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => i.split('\n').map(row => row.split(/\s+/))
const instruction = {
  'inc': 1,
  'dec': -1
}
const checkers = {
  '>': (a, b) => a > b,
  '<': (a, b) => a < b,
  '<=': (a, b) => a <= b,
  '>=': (a, b) => a >= b,
  '!=': (a, b) => a != b,
  '==': (a, b) => a == b,
}

const followInsctructions = instructions => {
  const registers = {}
  let max = 0
  instructions.forEach(([reg, op, value,, comp, check, valueCheck]) => {
    if(!registers[comp]) registers[comp] = 0
    if(checkers[check](registers[comp], parseInt(valueCheck))) {
      if(!registers[reg]) registers[reg] = 0
      registers[reg] += instruction[op] * parseInt(value)
      if(registers[reg] > max) max = registers[reg]
    } 
  })
  return [Math.max(...Object.values(registers)), max]
}

const [part1, part2] = followInsctructions(parse(input))

console.log({part1, part2})