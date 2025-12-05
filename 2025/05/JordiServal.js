const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => {
  let [ranges, ids] = i.split('\n\n').map(l => l.split('\n'))
  ranges = ranges.map(line => line.split("-").map(x => parseInt(x)))
  ids = ids.map(x => parseInt(x))
  return {ranges, ids}
}

const getFreshIds = ({ranges, ids}) => {
  return ids.filter(id => {
    return ranges.some(range => id >= range[0] && id <= range[1])
  }).length
}

const getAllRanges = ({ranges}) => {
  ranges = ranges.sort((a, b) => a[0] - b[0])
  let totalCount = 0
  do {
    const range = ranges.shift()
    const nextRange = ranges[0]
    if(nextRange && range[1] >= nextRange[0]) {
      range[1] = range[1] > nextRange[1] ? range[1] : nextRange[1]
      ranges[0] = range
    } else {
      totalCount += (range[1] - range[0] + 1)
    }
  } while (ranges.length > 0)
  return totalCount
}

const part1 = getFreshIds(parse(input))
const part2 = getAllRanges(parse(input))

console.log({part1, part2})