const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').map(l => l.split(''))
const WORD = 'XMAS'.split('')

const DIRECTION = {
  up: ([x, y]) => [x, y - 1],
  upRight: ([x, y]) => [x + 1, y - 1],
  right: ([x, y]) => [x + 1, y],
  downRight: ([x, y]) => [x + 1, y + 1],
  down: ([x, y]) => [x, y + 1],
  downLeft: ([x, y]) => [x - 1, y + 1],
  left: ([x, y]) => [x - 1, y],
  upLeft: ([x, y]) => [x - 1, y - 1],
}

const checkNext = (pos, dir, index, station) => {
  const nextPos = DIRECTION[dir](pos)
  if(!station[nextPos[1]] || !station[nextPos[1]][nextPos[0]]) return 0
  if(station[nextPos[1]][nextPos[0]] !== WORD[index]) return 0
  if(index < WORD.length - 1) return checkNext(nextPos, dir, index + 1, station)
  return 1
}

const countXMAS = station => {
  let count = 0
  for(let y = 0; y < station.length; y++) {
    for(let x = 0; x < station[0].length; x++) {
      if(station[y][x] === 'X') {
        count += checkNext([x, y], 'up', 1, station)
        count += checkNext([x, y], 'upRight', 1, station)
        count += checkNext([x, y], 'right', 1, station)
        count += checkNext([x, y], 'downRight', 1, station)
        count += checkNext([x, y], 'down', 1, station)
        count += checkNext([x, y], 'downLeft', 1, station)
        count += checkNext([x, y], 'left', 1, station)
        count += checkNext([x, y], 'upLeft', 1, station)
      }
    }
  }
  return count
}

const checkX = (pos, station) => {
  const ur = DIRECTION.upRight(pos)
  const ul = DIRECTION.upLeft(pos)
  const dr = DIRECTION.downRight(pos)
  const dl = DIRECTION.downLeft(pos)
  if(
    !station[ur[1]] || !station[ur[1]][ur[0]] ||
    !station[ul[1]] || !station[ul[1]][ul[0]] ||
    !station[dr[1]] || !station[dr[1]][dr[0]] ||
    !station[dl[1]] || !station[dl[1]][dl[0]]
  ) return 0
  if((station[ur[1]][ur[0]] === 'M')) {
    if(station[ul[1]][ul[0]] === 'M' && station[dr[1]][dr[0]] === 'S' && station[dl[1]][dl[0]] === 'S')
      return 1
    else if(station[ul[1]][ul[0]] === 'S' && station[dr[1]][dr[0]] === 'M' && station[dl[1]][dl[0]] === 'S')
      return 1
  } else if((station[dl[1]][dl[0]] === 'M')) {
    if(station[ul[1]][ul[0]] === 'M' && station[dr[1]][dr[0]] === 'S' && station[ur[1]][ur[0]] === 'S')
      return 1
    else if(station[ul[1]][ul[0]] === 'S' && station[dr[1]][dr[0]] === 'M' && station[ur[1]][ur[0]] === 'S')
      return 1
  }
  return 0
}

const countCrossMAS = station => {
  let count = 0
  for(let y = 0; y < station.length; y++) {
    for(let x = 0; x < station[0].length; x++) {
      if(station[y][x] === 'A') {
        count += checkX([x, y], station)
      }
    }
  }
  return count
}

console.time('p1')
const part1 = countXMAS(parse(input))
console.timeEnd('p1')
console.time('p2')
const part2 = countCrossMAS(parse(input))
console.timeEnd('p2')

console.log({part1, part2})