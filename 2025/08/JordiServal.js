const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').map(l => l.split(',').map(Number))

const getDistance = (a, b) => Math.sqrt((b[0] - a[0])**2 + (b[1] - a[1])**2 + (b[2] - a[2])**2)

const arrangeCircuits = (points, connections = 10) => {
  // [{pair: 'a-b', distance: X}]
  let distances = []
  for(let index = 0; index<points.length-1;index++) {
    const a = points[index]
    for(let x = index + 1; x<points.length; x++) {
      const b = points[x]
      const currD = {
        pair: `${index}-${x}`,
        distance: getDistance(a, b)
      }
      distances.push(currD)
    }
  }
  distances = distances.sort((a, b) => a.distance - b.distance)
  let circuits = [[...distances[0].pair.split('-')]], a, b
  for(let c = 1; c<connections; c++) {
    [a, b] = distances[c].pair.split('-')
    const cirA = circuits.findIndex(circ => circ.includes(a))
    const cirB = circuits.findIndex(circ => circ.includes(b))
    if(cirA !== -1) {
      if (cirB !== -1) {
        if(cirA !== cirB) {
          circuits[cirA] = [...circuits[cirA], ...circuits[cirB]]
          circuits.splice(cirB, 1)
        }
      } else {
        circuits[cirA].push(b)
      }
    } else if (cirB !== -1) {
      circuits[cirB].push(a)
    } else {
      circuits.push([a, b])
    }
    console.log(circuits, distances[c])

  }

  circuits = circuits.sort((a, b) => b.length - a.length)
  const partA = circuits.slice(0, 3).reduce((acc, curr) => acc * curr.length, 1)
  for(let c = connections; circuits.length !== 1; c++) {
    [a, b] = distances[c].pair.split('-')

    const cirA = circuits.findIndex(circ => circ.includes(a))
    const cirB = circuits.findIndex(circ => circ.includes(b))
    if(cirA !== -1) {
      if (cirB !== -1) {
        if(cirA !== cirB) {
          circuits[cirA] = [...circuits[cirA], ...circuits[cirB]]
          circuits.splice(cirB, 1)
        }
      } else {
        circuits[cirA].push(b)
      }
    } else if (cirB !== -1) {
      circuits[cirB].push(a)
    } else {
      circuits.push([a, b])
    }
    console.log(circuits, distances[c])
  }
  console.log(points[parseInt(a)], points[parseInt(b)])
  const partB = points[parseInt(a)][0] * points[parseInt(b)][0]
  return [partA, partB]
  
}

const [part1, part2] = arrangeCircuits(parse(input))

console.log({part1, part2})