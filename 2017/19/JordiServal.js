const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').map(row => row.split(''))
  
const moves = {
  up: (x, y) => {return [x, y-1]},
  down: (x, y) => {return [x, y+1]},
  left: (x, y) => {return [x-1, y]},
  right: (x, y) => {return [x+1, y]},
}

const followTube = tube => {
  let y = 0, x = tube[0].indexOf('|'), word = [], direction = 'down', steps = 0
  do {
    [x, y] = moves[direction](x, y)
    console.log(x, y, tube[y][x], direction)
    if(tube[y][x] !== '|' && tube[y][x] !== '-') {
      if(tube[y][x] === '+') {
        if(direction === 'up' || direction === 'down') {
          if(x+1 >= tube[y].length || tube[y][x+1] === ' ') direction = 'left'
          else direction = 'right'
        } else {
          if(y+1 >= tube.length || tube[y+1][x] === ' ') direction = 'up'
          else direction = 'down'
        }
      } else {
        word.push(tube[y][x])
      }
    }
    steps++
  } while(tube[y][x] !== ' ')
  return [word.join(''), steps]
}

const [part1, part2] = followTube(parse(input))

console.log({part1, part2})