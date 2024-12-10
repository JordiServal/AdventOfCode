const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').map(l => l.split(''))

const mcd = (a, b) => a ? mcd(b % a, a) : b

const setAntinodes = (map, origin, value) => {
  const anti = {}
  map.forEach((line, y) => {
    line.forEach((c, x) => {
      if(x !== origin[0] && y !== origin[1] && c === value ) {
        const vector = [x - origin[0], y - origin[1]]
        const nextAnti = [x + vector[0], y + vector[1]]
        if(nextAnti[0] >= 0 && nextAnti[0] < line.length && nextAnti[1] >= 0 && nextAnti[1] < map.length )
        anti[nextAnti.join(',')] = 1
      }
    })
  })
  return (anti)
}

const setAllAnti  = (map, origin, value) => {
  const anti = {}
  map.forEach((line, y) => {
    line.forEach((c, x) => {
      if(x !== origin[0] && y !== origin[1] && c === value ) {
        let vector = [x - origin[0], y - origin[1]]
        let nextAnti = [origin[0] + vector[0], origin[1] + vector[1]]
        while(nextAnti[0] >= 0 && nextAnti[0] < line.length && nextAnti[1] >= 0 && nextAnti[1] < map.length ) {
          anti[nextAnti.join(',')] = 1
          nextAnti = [nextAnti[0] + vector[0], nextAnti[1] + vector[1]]
        }
      }
    })
  })
  return (anti)

}

const getAntinodes = (map, all = false) => {
  let antinodes = {}
  map.forEach((line, y) => {
    line.forEach((c, x) => {
      if(c !== '.') 
        antinodes = {...antinodes, ...all ? setAllAnti(map, [x, y], c) : setAntinodes(map, [x, y], c)}
    })
  })

  return Object.keys(antinodes).length
}

// console.time('p1')
// console.timeEnd('p1')
// console.time('p2')
// console.timeEnd('p2')
const part1 = getAntinodes(parse(input))
const part2 = getAntinodes(parse(input), true)

console.log({part1, part2})