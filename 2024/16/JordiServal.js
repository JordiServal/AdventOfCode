const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').map(l => l.split(''))

const DIRECTION = [
  ([x, y]) => [x + 1, y],
  ([x, y]) => [x, y + 1],
  ([x, y]) => [x - 1, y],
  ([x, y]) => [x, y - 1],
]

const nextMove = (pos, dir, path, score, map) => {
  if(path.includes(pos.join(',')) || map[pos[1]][pos[0]] === '#') return null
  if(map[pos[1]][pos[0]] === 'E') return score
  path.push(pos.join(','))
  const scores = [
    nextMove(DIRECTION[dir](pos), dir, [...path], score + 1, map),
    nextMove(DIRECTION[(dir + 1) % 4](pos), (dir + 1) % 4, [...path], score + 1001, map),
    nextMove(DIRECTION[dir === 0 ? 3 : dir - 1](pos), dir === 0 ? 3 : dir - 1, [...path], score + 1001, map),
  ]
  // console.log(pos, dir, score, path.length)
  return Math.min(...scores.filter(x => x !== null))
}

const findPath = (map) => {
  let x = 0
  let y = map.findIndex(l => {
    x = l.join('').indexOf('S')
    return x !== -1
  })

  return nextMove([x, y], 0, [], 0, map)
}

const part1 = findPath(parse(input))
const part2 = null //(parse(input))

console.log({part1, part2})