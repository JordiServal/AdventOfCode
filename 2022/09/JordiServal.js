const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .split("\n").map(x => x.split(' '))

const DIRECTIONS = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0]
}

const drawRope = (rope) => {
  const minX = Math.min(...rope.map(x => x[0]))
  const maxX = Math.max(...rope.map(x => x[0]))
  const minY = Math.min(...rope.map(x => x[1]))
  const maxY = Math.max(...rope.map(x => x[1]))
  const grid = new Array(maxY-minY+1).fill(0).map(() => new Array(maxX-minX+1).fill('.'))
  rope.forEach(([x, y], k) => {
    grid[y-minY][x-minX] = k
  })
  grid.forEach(row => console.log(row.join('')))
}

const simulateSteps = (steps, knots) => {
  const rope = new Array(knots).fill(0).map(() => [0, 0])
  const tailPositions = {
    '0,0': true
  }
  steps.forEach(([dir, stepCount]) => {
    const [dx, dy] = DIRECTIONS[dir]
    for (let i = 0; i < parseInt(stepCount); i++) {
      rope[0] = [rope[0][0] + dx, rope[0][1] + dy]
      rope.reduce((prev, curr, index) => {
        if(
          !(curr[0] <= prev[0]+1 &&
            curr[0] >= prev[0]-1 && 
            curr[1] <= prev[1]+1 &&
            curr[1] >= prev[1]-1)
        ) {
          if(curr[0] === prev[0]) { 
            const sum = curr[1] < prev[1] ? 1 : -1
            rope[index] = [rope[index][0], rope[index][1]+sum]
          } else if(curr[1] === prev[1]) {
            const sum = curr[0] < prev[0] ? 1 : -1
            rope[index] = [rope[index][0]+sum, rope[index][1]]
          } else {
            const sum = [curr[0] < prev[0] ? 1 : -1, curr[1] < prev[1] ? 1 : -1]
            rope[index] = [rope[index][0]+sum[0], rope[index][1]+sum[1]]
          } 
        }
        return rope[index]
      })
      tailPositions[rope[rope.length-1].join(',')] = true
    }
  });
  return Object.keys(tailPositions).length
}

const part1 = simulateSteps(input, 2)
const part2 = simulateSteps(input, 10)

console.log({part1, part2})