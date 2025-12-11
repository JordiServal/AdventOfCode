const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => {
  const points = i.split('\n').map(l => l.split(',').map(Number))
  // [{pair: [a, b], distance: X}]
  let distances = []
  for(let index = 0; index<points.length-1;index++) {
    const a = points[index]
    for(let x = index + 1; x<points.length; x++) {
      const b = points[x]
      const currD = {
        pair: [index, x],
        distance: getDistance(a, b)
      }
      distances.push(currD)
    }
  }
  return [points, distances.sort((a, b) => a.distance - b.distance)]
}

const getDistance = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2])

const arrangeCircuits = ([points, distances]) => {
  let circuits = points.map((_, index) => [index]), part1 = 0, part2 = 0
  for(let c = 0; c<distances.length; c++) {
    const [a, b] = distances[c].pair
    const cirA = circuits.findIndex(circ => circ.includes(a))
    const cirB = circuits.findIndex(circ => circ.includes(b))

    if(cirA !== cirB) {
      circuits[cirA] = [...circuits[cirA], ...circuits[cirB]]
      circuits.splice(cirB, 1)
    }
    
    if(c >= 999 && part1 === 0) {
      part1 = circuits.sort((a, b) => b.length - a.length).slice(0, 3).reduce((acc, curr) => acc * curr.length, 1)
    }

    if(circuits.length === 1) {
      part2 = points[distances[c].pair[0]][0] * points[distances[c].pair[1]][0]
      break
    }
  }
  return {part1, part2}
}

const {part1, part2} = arrangeCircuits(parse(input))

console.log({part1, part2})