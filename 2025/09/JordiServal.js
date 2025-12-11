const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').map(l => l.split(',').map(Number))

const getArea = ([aX, aY], [bX, bY]) => {
  if(aX >= bX) aX++
  else bX++
  if(aY >= bY) aY++
  else bX++
  return Math.abs((aX - bX) * (aY - bY))
}

const getMaxArea = points => {
  let maxArea = 0
  for(let index = 0; index<points.length-1;index++) {
    const a = points[index]
    for(let x = index + 1; x<points.length; x++) {
      const b = points[x]
      const currArea = getArea(a, b)
      if(maxArea < currArea ) maxArea = currArea
    }
  }

  return maxArea
}

const part1 = getMaxArea(parse(input))
const part2 = '' // parse(input)
console.log({part1, part2})