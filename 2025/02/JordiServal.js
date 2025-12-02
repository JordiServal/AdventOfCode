const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse= (i) => i.split(',').map(l => l.split('-').map(Number))

const checkInvalidIDs = (ranges) => {
  return ranges.reduce((acc, curr) => {
    for(let x = curr[0]; x<=curr[1]; x++) {
      let id = x.toString().split('')
      if(id.length % 2 !== 0)
        continue
      const subId = id.splice(0, id.length / 2).join('')
      id = id.join('')
      if(subId === id) 
        acc += x
    }
    return acc
  }, 0)
}

const checkPatternsIDs = (ranges) => {
  return ranges.reduce((acc, curr) => {
    for(let x = curr[0]; x<=curr[1]; x++) {
      let id = x.toString()
      for(let y = 1; y<=id.length/2; y++) {
        if(id.replaceAll(id.substring(0, y), "") === "") {
          acc += x
          break;
        }
      }
    }
    return acc
  }, 0)
}

const part1 = checkInvalidIDs(parse(input))
const part2 = checkPatternsIDs(parse(input))

console.log({part1, part2})