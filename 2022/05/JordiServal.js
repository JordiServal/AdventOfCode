const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .split("\n\n")

const parseInput = ([display, moves]) => {
  display = display.split('\n').map(line => line.match(/.{1,4}/g).map(crate => crate.replace(/[\[\] ]/g, '')))
  stack = new Array(display.pop().length).fill([])
  display.reverse().forEach((line) => {
    line.forEach((crate, index) => {
      if(crate !== '') stack[index] = [...stack[index], crate]
      // if(crate !== '') stack[index].push(crate)
    })
  })

  moves = moves.split('\n').map(line => {
    const [m, crates, f, start, t, end] = line.split(' ').map(n => parseInt(n))
    return {crates, start: start -1, end: end -1}
  })
  return {moves, stack}
}

const moveCrates9000 = ({moves, stack}) => {
  moves.forEach(({crates, start, end})=> {
    const crane = stack[start].splice(stack[start].length-crates, crates)
    stack[end] = [...stack[end], ...crane.reverse()]
  })

  return stack.map(col => col.pop()).join('')
}

const moveCrates9001 = ({moves, stack}) => {
  moves.forEach(({crates, start, end})=> {
    const crane = stack[start].splice(stack[start].length-crates, crates)
    stack[end] = [...stack[end], ...crane]
  })

  return stack.map(col => col.pop()).join('')
}


const part1 = moveCrates9000(parseInput(input))
const part2 = moveCrates9001(parseInput(input))


console.log({part1, part2})