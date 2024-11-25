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

const parse= (i) => i.split(',').map(order => {
  order = order.split('')
  const func = order.shift()
  return {func, params: order.join('')}
})

const followMoves = (programs, instructions) => {
  instructions.forEach(move => {
    // console.log(programs.join(''))
    programs = moves[move.func](programs, move.params)
  })
  return programs
}

const followSequence = instructions => {
  let programs = 'abcdefghijklmnop'.split('')
  return followMoves(programs, instructions).join('')
}

const followDance = instructions => {
  // let programs = 'abcde'.split('')
  let programs = 'abcdefghijklmnop'.split(''), permutations = {'abcdefghijklmnop': 0}, comp = -1
  for(let c=1;c<1000000000 && comp === -1;c++){
    programs = followMoves(programs, instructions)
    if(permutations[programs.join('')] === undefined) permutations[programs.join('')] = c
    else {
      comp = c
    }  
  }

  return Object.keys(permutations)[1000000000 % comp]
}


const part1 = followSequence(parse(input))
const part2 = followDance(parse(input))

console.log({part1, part2})