const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString().replace(/\r/g, "")
  .split("\n").map((x, ix) => x.split('').map((y, iy) => {return {val: y.charCodeAt() % 97, visited: false, coord: [ix, iy]}}))

const START = 83
const START_VAL = 0
const END = 69
const END_VAL = 26

const climb = ([x, y], map, steps, stepsCheck = []) => {
  if(y < 0 || y === map.length || x < 0 || x === map[0].length) return Infinity
  if(map[y][x].visited) return Infinity
  if(map[y][x].val === END_VAL) {
    console.log(stepsCheck)
    return steps}
  map[y][x].visited = true
  const val = map[y][x].val
  const nextVals = [
    map[y-1] ? map[y-1][x] : undefined,
    map[y+1] ? map[y+1][x] : undefined,
    map[y][x-1] ? map[y][x-1] : undefined,
    map[y][x+1] ? map[y][x+1] : undefined
  ].filter(x=> x).filter(x =>x.val >= val -1 && x.val <= val + 1 && !x.visited)
  if(nextVals.length === 0) return Infinity
  return Math.min(
    ...nextVals.map((n) => {
      return climb(n.coord, JSON.parse(JSON.stringify(map)), steps + 1, [...stepsCheck, n])
    })
  )
}

const lowestClimb = (map) => {
  let startPoint = []
  map.find((row, y) => {
    let x = row.find((alt) => alt.val === START)
    x = row.indexOf(x)
    if(x !== -1) {
      startPoint = [x, y]
      map[y][x].val = START_VAL
      return true
    } else return false
  })
  map.find((row, y) => {
    let x = row.find((alt) => alt.val === END)
    x = row.indexOf(x)
    if(x !== -1) {
      map[y][x].val = END_VAL
      return true
    } else return false
  })
  return climb(startPoint, map, 0)
}
const part1 = lowestClimb(JSON.parse(JSON.stringify(input)))
const part2 = ""

console.log({part1, part2})