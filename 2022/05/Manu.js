const { movements, instructions} = require('./helpers.js');

const instructionsCopy = JSON.parse(JSON.stringify(instructions))
function move ({number, from, to}) {
  const fromCrates = instructions[from].splice(instructions[from].length - number, number)
  instructions[to].push(...fromCrates.reverse())
}

function move2 ({number, from, to}) {
  const fromCrates = instructionsCopy[from].splice(instructionsCopy[from].length - number, number)
  instructionsCopy[to].push(...fromCrates)
}

movements.forEach((m) => {
  const { number, from, to } = m;
  const keyFrom = from - 1
  const keyTo = to - 1
  
  move({ number, from: keyFrom, to: keyTo })
  move2({ number, from: keyFrom, to: keyTo })
})


console.log(Object.values(instructions).map((i) => i.at(-1)).join(''))
console.log(Object.values(instructionsCopy).map((i) => i.pop()).join(''))
