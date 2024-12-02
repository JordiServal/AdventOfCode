const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const moves = {
  's': (programs, params) => {
    const aux = programs.splice(programs.length - parseInt(params))
    return [...aux, ...programs]
  },
  'x': (programs, params) => {
    const [a, b] = params.split('/').map(Number)
    const aux = programs[a]
    programs[a] = programs[b]
    programs[b] = aux
    return programs
  },
  'p': (programs, params) => {
    const [a, b] = params.split('/').map(p => programs.indexOf(p))
    const aux = programs[a]
    programs[a] = programs[b]
    programs[b] = aux
    return programs
  }
}

const createSpinLock = steps => {
  const spin = [0]
  let current = 0
  for(let num = 1; num <= 2017 ; num++) {
    current = (current + steps) % spin.length + 1
    spin.splice(current, 0, num)
  }
  return spin[(current + 1)]
}

const createHugeSpinLock = steps => {
  let current = 0, currentFirst = 0, spin = 1
  for(let num = 1; num <= 50000000 ; num++) {
    current = (current + steps) % spin + 1
    spin += 1
    if(current === 1) currentFirst = num
  }
  return currentFirst
}

const part1 = createSpinLock(parseInt(input))
const part2 = createHugeSpinLock(parseInt(input))

console.log({part1, part2})