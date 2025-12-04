const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse= (i) => i.split('\n').map(l => l.split('').map(x=> x==='@'))

const checkRoll = (x, y, map) => {
  let countAround = 0
  if(x - 1 >= 0) {
    if(y - 1 >= 0 && map[y-1][x-1]) countAround++
    if(map[y][x-1]) countAround++
    if(y+1 < map.length && map[y+1][x-1]) countAround++
  }
  if(x + 1 < map[y].length) {
    if(y - 1 >= 0 && map[y-1][x+1]) countAround++
    if(map[y][x+1]) countAround++
    if(y+1 < map.length && map[y+1][x+1]) countAround++
  }
  if(y - 1 >= 0 && map[y-1][x]) countAround++
  if(y+1 < map.length && map[y+1][x]) countAround++
  
  return countAround < 4
}

const countRolls = map => {
  let accessRolls = 0
  map.forEach((line, y) => {
    line.forEach((pos, x) => {
      if(pos) {
        accessRolls += checkRoll(x, y, map) ? 1 : 0
      }
    })
  })
  return accessRolls
}

const countTotalRolls = map => {
  let deletedRolls = 0
  let accessRolls = 0
  do {
    const auxMap = JSON.parse(JSON.stringify(map))
    accessRolls = 0
    auxMap.forEach((line, y) => {
      line.forEach((pos, x) => {
        if(pos) {
          const canDelete = checkRoll(x, y, auxMap)
          if(canDelete) {
            accessRolls ++
            map[y][x] = false
          }
        }
      })
    })
    deletedRolls += accessRolls
  } while(accessRolls !== 0)
  return deletedRolls
}

const part1 = countRolls(parse(input))
const part2 = countTotalRolls(parse(input))

console.log({part1, part2})