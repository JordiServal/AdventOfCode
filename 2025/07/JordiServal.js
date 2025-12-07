const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.replace('S', 1).replaceAll('.', 0).split('\n').map(l => l.split('').map(x => x === '^' ? x : parseInt(x)))
const drawMatrix = m => console.log(m.map(l => l.join('')).join('\n'), '\n--------------------------------------')

const countSplitTachyons = (matrix) => {
  let splitted = 0
  for(let y=0; y<matrix.length-1; y++) {
    for(let x=0; x<matrix[y].length; x++) {
      if(matrix[y][x]=== 1) {
        if(matrix[y + 1][x] === '^') {
          splitted++
          matrix[y + 1][x - 1] = 1
          matrix[y + 1][x + 1] = 1
        } else {
          matrix[y + 1][x] = 1
        }
      }
    }
  }
  return splitted
}

const countTimelines = (matrix) => {
  for(let y=0; y<matrix.length-1; y++) {
    for(let x=0; x<matrix[y].length; x++) {
      if(matrix[y][x] !== 0 && matrix[y][x] !== '^') {
        if(matrix[y + 1][x] === '^') {
          matrix[y + 1][x - 1] += matrix[y][x] 
          matrix[y + 1][x + 1] += matrix[y][x]
        } else {
          matrix[y + 1][x] += matrix[y][x]
        }
      }
    }
  }
  return matrix.pop().filter(Number).reduce((a, b) => a + b) 
}


// const countTimelines = (matrix, timelines = 1) => {
//   const x = matrix.shift().findIndex(l => l === '|')
//   if(matrix[0][x] === '^') {
//     // Split timeline
//     matrix[0][x-1] = '|'
//     timelines += countTimelines(JSON.parse(JSON.stringify(matrix)), 0)
//     matrix[0][x-1] = '.'
//     matrix[0][x+1] = '|'
//     timelines += countTimelines(JSON.parse(JSON.stringify(matrix)), 1)
//   } else if(matrix.length > 1) {
//     matrix[0][x] = '|'
//     timelines += countTimelines(matrix, 0)
//   }
//   return timelines
// }

const part1 = countSplitTachyons(parse(input))
const part2 = countTimelines(parse(input))

console.log({part1, part2})