const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")

const parseInput = (input) => input.map((line) => line.trim().split('').map((char) => char === '#' ? true : false))

const lights = parseInput(input)

const checkNeighbours = (lights, x, y) => {
  let count = 0
  if(y - 1 >= 0 && lights[y - 1][x - 1]) count++
  if(y - 1 >= 0 && lights[y - 1][x]) count++
  if(y - 1 >= 0 && lights[y - 1].length > x + 1 && lights[y - 1][x + 1]) count++
  if(lights[y][x - 1]) count++
  if(lights[y].length > x + 1 && lights[y][x + 1]) count++
  if(y + 1 < lights.length && lights[y + 1] && lights[y + 1][x - 1]) count++
  if(y + 1 < lights.length && lights[y + 1] && lights[y + 1][x]) count++
  if(y + 1 < lights.length && lights[y + 1].length > x + 1 && lights[y + 1] && lights[y + 1][x + 1]) count++
  if(lights[y][x] && (count === 2 || count === 3)) return true
  if(!lights[y][x] && count === 3) return true
  return false
}

const checkLights = (lights, steps) => {
  for(let step = 0; step < steps; step++) {
    lights = lights.map((row, y) => {
      return row.map((light, x) => {
        return checkNeighbours(lights, x, y)
      })
    })
  }
  return lights.reduce((acc, row) => row.reduce((sub, light) => sub + light, 0) + acc, 0)
}

const lightCorner = (lights) => {
  lights[0][0] = true
  lights[0][lights[0].length - 1] = true
  lights[lights.length - 1][0] = true
  lights[lights.length - 1][lights[0].length - 1] = true
  return lights
}

const checkLightsCorners = (lights, steps) => {
  for(let step = 0; step < steps; step++) {
    lights = lightCorner(lights)
    lights = lights.map((row, y) => {
      return row.map((light, x) => {
        return checkNeighbours(lights, x, y)
      })
    })
  }
  lights = lightCorner(lights)
  return lights.reduce((acc, row) => row.reduce((sub, light) => sub + light, 0) + acc, 0)
}
const days = 100
const part1 = checkLights(lights, days)
const part2 = checkLightsCorners(lights, days)


console.log({ part1, part2 });