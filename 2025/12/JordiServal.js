const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => {
  i = i.split('\n\n')
  const regions = i.pop().split('\n').map(l => {
    let [size, items] = l.split(': ')
    size = size.split('x').map(Number)
    items = items.split(' ').map(Number)
    return {size, items}
  })
  const presents = i.map(piece => {
    size = piece.split('').filter(x=> x=== '#').length
    piece = piece.split('\n')
    piece.shift()
    return {size, piece}
  })
  return {regions, presents}
}

const checkFittedRegions = ({regions, presents}) => {
  return regions.reduce((count, region, i) => {
    const presentsFitted = region.size.reduce((area, x) => Math.floor(x/3) * area, 1)
    const totalPresents = region.items.reduce((sum, x) => sum + x)
    const totalArea = region.size[0] * region.size[1]
    const totalOccupied = presents.reduce((sum, p) => sum + p.size, 0)
    if(presentsFitted >= totalPresents) count.possible++
    else if(totalArea > totalOccupied)
      count.impossible ++
    else 
      count.undetermined ++
    return count
  }, {possible: 0, impossible: 0, undetermined: 0})
}

const time = Date.now()
const part1 = checkFittedRegions(parse(input))
const time2 = Date.now()
console.log(`Part 1 Time: ${time2 - time}ms`)
const part2 = '' // parse(input)
console.log({part1, part2})