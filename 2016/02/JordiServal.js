const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(line => line.split(''))

const getCode = (moves, numPad, position) => {
  const movements = {
    'U': p => numPad[p.x-1] && numPad[p.x-1][p.y] ? {...p, x: p.x-1} : p,
    'D': p => numPad[p.x+1] && numPad[p.x+1][p.y] ? {...p, x: p.x+1} : p,
    'R': p => numPad[p.x][p.y+1] ? {...p, y: p.y+1} : p,
    'L': p => numPad[p.x][p.y-1] ? {...p, y: p.y-1} : p,
  }

  return moves.map(line => {
    line.forEach(move => {
      position = movements[move](position)
    })
    return numPad[position.x][position.y]
  })
}



const part1 = getCode(parse(input), [
  [1,2,3],
  [4,5,6],
  [7,8,9]
], {x: 1, y: 1})
const part2 = getCode(parse(input), [
  [null, null, 1, null, null],
  [null, 2, 3, 4, null],
  [5, 6, 7, 8, 9],
  [null, 'A', 'B', 'C', null],
  [null, null, 'D', null, null]
], {x: 2, y: 0})

console.log({part1, part2})