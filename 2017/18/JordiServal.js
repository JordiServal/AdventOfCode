const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').map(row => row.split(' '))
  
const instructions = {
  set: (registers, x, y) => {
    registers[x] = y
    return registers
  },
  add: (registers, x, y) => {
    registers[x] += y
    return registers
  },
  mul: (registers, x, y) => {
    registers[x] *= y
    return registers
  },
  mod: (registers, x, y) => {
    registers[x] %=  y
    return registers
  },
}

var sleep = function(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
};

const followInstructions =  orders => {
  let registers = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((obj, c) => {
    obj[c] = 0
    return obj
  }, {}), lastAudio = 0
  for(let i= 0; i < orders.length; i++) {
    let current = orders[i]
    // current[1] = parseNum(current[1])
    if(current[2] !== undefined) {
      current[2] = !isNaN(parseInt(current[2])) ? parseInt(current[2]) : registers[current[2]]
    }

    if(current[0] === 'snd'){
      lastAudio = registers[current[1]]
      if(lastAudio === 8039) return 'x'
    }else if(current[0] === 'rcv'){
      if(registers[current[1]] !== 0) return lastAudio
    }else if(current[0] === 'jgz'){
      if(!isNaN(parseInt(current[1])) ? parseInt(current[1]) : registers[current[1]] > 0) i += (current[2]) - 1
    }else{
      registers = instructions[current[0]](registers, current[1], current[2])
      console.log(i, current, registers[current[1]], lastAudio)
    }
  }
}

const part1 = followInstructions(parse(input))
const part2 = null//(parse(input))

console.log({part1, part2})