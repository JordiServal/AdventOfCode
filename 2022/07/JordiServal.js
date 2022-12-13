const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()


const parseInput = (inp) => {
  return inp.split('$ ').filter((c)=>c!=='').map((cmd)=> {
    return cmd.trim('\n').split('\n').map((line)=>line.split(' '))
  })
}
    
const getStructure = (inp) => {
  const commands = parseInput(inp)

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
  return createStructure()
}

const getMinSize = (inp) => {

  let size = 0
  const getDirSize = (struct, min=0) => {
    let dirSize = 0
    Object.keys(struct).forEach((key) => {
      if(typeof struct[key] === 'object') {
        const dir = getDirSize(struct[key], min)
        if(dir <= min )
          size += dir
        
        dirSize += dir
      } else {
        dirSize += struct[key]
      }
    })
    // if(dirSize <= min) 
    //   size += dirSize
    
    return dirSize
  }
  getDirSize(getStructure(inp)['/'], 100000)
  return size
}

const getDeleteSize = (inp) => {
  const structure = getStructure(inp)
  const dirs = []
  
  const getDirSize = (struct) => {
    let dirSize = 0
    Object.keys(struct).forEach((key) => {
      if(typeof struct[key] === 'object') {
        const size = getDirSize(struct[key])
        dirs.push({size, name: key})
        dirSize += size
      } else {
        dirSize += struct[key]
      }
    })
    return dirSize
  }

  const deleteMinDir = (directories, total, min) => {
    directories = directories.sort((a,b)=>b.size-a.size)
    const unused = total - directories[0].size
    directories = directories.filter((dir)=>(unused + dir.size) > min)
    return directories[directories.length-1].size
  }

  getDirSize(structure)
  return deleteMinDir(dirs, 70000000, 30000000)
}

const part1 = getMinSize(input)
const part2 = getDeleteSize(input)

console.log({part1, part2})