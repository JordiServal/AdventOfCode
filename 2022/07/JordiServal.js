const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()


const parseInput = (inp) => {
  return inp.split('$ ').filter((c)=>c!=='').map((cmd)=> {
    return cmd.trim('\n').split('\r\n').map((line)=>line.split(' '))
  })
}
    

const commands = parseInput(input)

const createStructure = () => {
  let struc = {}
  do {
    const cmd = commands.shift()
    if(cmd.length === 1) {
      // CD
      const dir = cmd[0][1]
      if(dir === '..') {
        return struc
      } else {
        struc[dir] = createStructure()
      }
    } else {
      // LS
      cmd.shift()
      cmd.forEach((line) => {
        if(line[0] === 'dir') 
          struc[line[1]] = {}
        else
          struc[line[1]] = parseInt(line[0])
      })
    }
  } while(commands.length > 0)
  return struc
}

const getDirSize = (struct, size = 0, min=0) => {
  let dirSize = 0
  Object.keys(struct).forEach((key) => {
    console.log(key, dirSize, size, struct[key])
    if(typeof struct[key] === 'object') {
      const dir = getDirSize(struct[key], size, min)
      if(dir <= min ) {
        size += dir
      }
      dirSize += dir
    } else {
      dirSize += struct[key]
    }
  })
  if(dirSize <= min) {
    size += dirSize
  }
  return size
}


const part1 = getDirSize(createStructure(commands), 0, 100000)
const part2 = ''


// console.log(part1)
console.log({part1, part2})