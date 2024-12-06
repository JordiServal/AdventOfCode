const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').map(l => l.split(''))

const DIRECTION = [
  ([x, y]) => [x, y - 1],
  ([x, y]) => [x + 1, y],
  ([x, y]) => [x, y + 1],
  ([x, y]) => [x - 1, y],
]

const followPath = map => {
  let pos = [], dir = 0
  map.some((line, y) => {
    const x = line.indexOf('^')
    if(x !== -1) {
      pos = [x, y]
      return true
    } 
  })
  const visited = []
  while(map[pos[1]] && map[pos[1]][pos[0]]) {
    if(!visited.includes(pos.join('-'))) visited.push(pos.join('-'))
    const nextPos = DIRECTION[dir](pos)
    // console.log({nextPos})
    if(map[nextPos[1]] && map[nextPos[1]][nextPos[0]] === '#')
      dir = (dir + 1) % 4
    else pos = nextPos
  }

  return visited
}

const checkObstacle = (map, pos, obstacle) => {
  map[obstacle[1]][obstacle[0]] = '#'
  let visited = {}, dir = 0
  while(map[pos[1]] && map[pos[1]][pos[0]]) {
    const coord = pos.join('-')
    if(!visited[coord]) visited[coord] = 0
    visited[coord] += 1
    const nextPos = DIRECTION[dir](pos)
    // console.log(nextPos)
    if(visited[coord] > 3)
      return true
    if(map[nextPos[1]] && map[nextPos[1]][nextPos[0]] === '#')
      dir = (dir + 1) % 4
    else pos = nextPos
  }
  return false
}

const checkLoops = map => {
  let pos = [], count = 0
  map.some((line, y) => {
    const x = line.indexOf('^')
    if(x !== -1) {
      pos = [x, y]
      return true
    } 
  })

  const coords = followPath(map).map(c => c.split('-').map(Number))
  coords.shift()
  coords.forEach((coord, index) => {
    count += checkObstacle(JSON.parse(JSON.stringify(map)), [...pos], coord) ? 1 : 0
  })

  return count
}

console.time('p1')
const part1 = followPath(parse(input)).length
console.timeEnd('p1')
console.time('p2')
const part2 = checkLoops(parse(input))
console.timeEnd('p2')

console.log({part1, part2})