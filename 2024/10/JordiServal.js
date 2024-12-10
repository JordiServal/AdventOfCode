const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').map(l => l.split('').map(Number))

const checkTrailhead = (prevValue, [x, y], map) => {
  let value = map[y][x], peaks = {}
  if(prevValue + 1 !== value) return {}
    if(value === 9) return {[[x,y].join('-')]: 1}
  if(x < map[0].length -1) peaks = {...peaks, ...checkTrailhead(value, [x + 1, y], map)}
  if(y < map.length -1) peaks = {...peaks, ...checkTrailhead(value, [x, y + 1], map)}
  if(y > 0) peaks = {...peaks, ...checkTrailhead(value, [x, y - 1], map)}
  if(x > 0) peaks = {...peaks, ...checkTrailhead(value, [x - 1, y], map)}
  return peaks
}

const checkAllTrailhead = (prevValue, [x, y], map) => {
  let value = map[y][x], peaks = []
  if(prevValue + 1 !== value) return []
    if(value === 9) return [[x,y].join('-')]
  if(x < map[0].length -1) peaks = [...peaks, ...checkAllTrailhead(value, [x + 1, y], map)]
  if(y < map.length -1) peaks = [...peaks, ...checkAllTrailhead(value, [x, y + 1], map)]
  if(y > 0) peaks = [...peaks, ...checkAllTrailhead(value, [x, y - 1], map)]
  if(x > 0) peaks = [...peaks, ...checkAllTrailhead(value, [x - 1, y], map)]
  return peaks
}

const getTrailheads = map => {
  let sum1 = 0, sum2 = 0
  map.forEach((l, y) => {
    l.forEach((p, x) => {
      if(p === 0) {
        sum1 += Object.keys(checkTrailhead(-1, [x, y], map)).length
        sum2 += checkAllTrailhead(-1, [x, y], map).length
      } 
    })
  })
  return [sum1, sum2]
}

// console.time('p1')
// console.timeEnd('p1')
// console.time('p2')
// console.timeEnd('p2')
const [part1, part2] = getTrailheads(parse(input))

console.log({part1, part2})