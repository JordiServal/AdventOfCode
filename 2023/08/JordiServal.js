const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => {
  let [instructions, nodes] = input.split('\n\n')
  nodes = nodes.split('\n').reduce((acc, node) => {
    const [name, directions] = node.split('=').map(part => part.trim())
    const [L, R] = directions.replace(/[\(\)]/g, '').split(',').map(p => p.trim())
    acc[name] = {name, R, L} 
    return acc
  }, {})
  return {
    instructions: instructions.trim().split(''),
    nodes
  }
}

const stepsToZZZ = ({instructions, nodes}) => {
  let currentNode = 'AAA'
  let steps = 0, currentInstruction = ''
  for(steps = 0; currentNode !== 'ZZZ'; steps++) {
    currentInstruction = instructions[steps % instructions.length]
    currentNode = nodes[currentNode][currentInstruction]
  }
  return steps
}

const mcd = (a, b) => a ? mcd(b % a, a) : b
const mcm = (a, b) => a * b / mcd(a, b)

const ghostStepsToZZZ = ({instructions, nodes}) => {
  return Object.keys(nodes).filter(node => {
    // Get all initial nodes ending with A
    return node[2] === 'A'
  }).map(node => {
    // Get every step from initial nodes to reach node ending in Z
    let steps = 0
    for(steps = 0; node[2] !== 'Z'; steps++) {
      currentInstruction = instructions[steps % instructions.length]
      node = nodes[node][currentInstruction]
    }
    return steps
  }).reduce(mcm) // MCM / LCM between all
}

const part1 = stepsToZZZ(parse(input))
const part2 = ghostStepsToZZZ(parse(input))
console.log({part1, part2})
