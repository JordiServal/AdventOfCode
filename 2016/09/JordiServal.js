const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.trim().split('')

const decompressFile = file => {
  let decompressed = [], firstMarker = 0
  do {
    firstMarker = file.indexOf('(')
    if(firstMarker === -1) {
      decompressed.push(...file)
    } else {
      decompressed.push(...file.splice(0, firstMarker))
      const secondMarker = file.indexOf(')')
      const marker = file.splice(0, secondMarker + 1).join('').replace(/\(|\)/, '').split('x')
      const substring = file.splice(0, parseInt(marker[0]))
      decompressed.push(...Array(parseInt(marker[1])).fill(substring.join('')).join('').split(''))
    }
  } while(firstMarker !== -1)
  return decompressed.length
}

const decompressTotalFile = file => {
  const weights = file.map(x => 1)
  let length = 0
  for(let i = 0; i < file.length; i++) {
    if(file[i] === '(') {
      const nextI = file.indexOf(')', i)
      const [long, multiply] = file.slice(i+1, nextI).join('').split('x').map(Number)
      i = nextI

      for(let j = i + 1; j < i + long + 1; j++) {
        weights[j] = weights[j] * multiply
      }
    } else  {
      length += weights[i]
    }
  }
  return length
}

const part1 = decompressFile(parse(input))
const part2 = decompressTotalFile(parse(input))

console.log({part1, part2})
