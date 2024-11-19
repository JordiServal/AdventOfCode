const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => i.split(/\s+/).map(Number)

const redistribute = (mem) => {
  const max = Math.max(...mem), maxI = mem.indexOf(max)
  mem[maxI] = 0
  for(let i = 1; i <= max; i++) {
    mem[(maxI + i) % mem.length]++
  }
  return mem
}

const getInfiniteLoop = (mem) => {
  const history = {}
  let cycles = 0
  do {
    history[mem.join('')] = 1
    mem = redistribute(mem)
    cycles ++
  } while (!history[mem.join('')])
  return cycles
}

const getInfiniteLoopTwice = (mem) => {
  const history = {}
  let cycles = 0
  do {
    history[mem.join('')] = cycles
    mem = redistribute(mem)
    cycles ++
  } while (history[mem.join('')] === undefined)
  return cycles - history[mem.join('')]
}

const part1 = getInfiniteLoop(parse(input))
const part2 = getInfiniteLoopTwice(parse(input))

console.log({part1, part2})