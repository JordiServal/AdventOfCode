const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => i.split(',')

const directions = {
  ne: ([x, y]) => x % 2 == 0 ? [x + 1, y] : [x + 1, y - 1],
  se: ([x, y]) => x % 2 == 0 ? [x + 1, y + 1] : [x + 1, y],
  s: ([x, y]) => [x , y + 1],
  sw: ([x, y]) => x % 2 == 0 ? [x - 1, y + 1] : [x - 1, y],
  nw: ([x, y]) => x % 2 == 0 ? [x - 1, y] : [x - 1, y - 1],
  n: ([x, y]) => [x, y - 1],
}

const followDirections = instructions => {
  let coords = [0, 0]
  instructions.forEach(order => {
    coords = directions[order](coords)
  })

  let steps = 0
  while(coords[0] !== 0 || coords[1] !== 0) {
    if(coords[0] == 0) coords = coords[1] > 0 ? directions.n(coords) : directions.s(coords)
    else if(coords[0] > 0) {
      if(coords[1] > 0) coords = directions.nw(coords)
      else coords = directions.sw(coords)
    } else {
      if(coords[1] > 0) coords = directions.ne(coords)
      else coords = directions.se(coords)
    }
    steps ++
  }
  return steps
}

const part1 = followDirections(parse(input))
const part2 = (parse(input).length)
console.log({part1, part2})       