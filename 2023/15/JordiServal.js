const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split(',').map(e => e.trim().split(''))

const singleHash = hash => hash.reduce((value, char) => ((value + char.charCodeAt(0)) * 17) % 256, 0)

const getHashValue = hashes => {
  return hashes.reduce((acc, hash) => {
    return acc + singleHash(hash)
  }, 0)
}

const getBoxValues = hashes => {
  const boxes = {}
  hashes.forEach((hash,i) => {
    const index = hash.indexOf('=')
    let focal = -1
    if(index !== -1) {
      focal = hash.splice(index)
      focal.shift()
      focal = parseInt(focal.join(''))
    } else {
      hash.pop()
    }
    const boxNum = singleHash(hash)
    const label = hash.join('')
    if(focal !== -1) {
      if(!boxes[boxNum]) boxes[boxNum] = []
      const prev = boxes[boxNum].findIndex(b => b.label === label)
      if(prev !== -1) 
        boxes[boxNum][prev] = {label, focal, box: boxNum + 1}
      else 
        boxes[boxNum].push({label, focal, box: boxNum + 1})
    } else if(boxes[boxNum]){
      boxes[boxNum] = boxes[boxNum].filter(box => box.label !== label)
    }
  })
  return Object.keys(boxes).reduce((total, box) => {
    return total + boxes[box].reduce((acc, curr, index) => {
      // console.log(curr.box, index+1,  curr.focal)
      return acc + (curr.box * curr.focal * (index + 1))
    }, 0)
  }, 0)
}

const part1 = getHashValue(parse(input))
const part2 = getBoxValues(parse(input))
console.log({part1, part2})