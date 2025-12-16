const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').reduce((obj, l) => {
  let [origin, destinies] = l.split(': ')
  obj[origin] = destinies.split(' ')
  return obj
}, {})

const countPaths = (graph, pos, visited=[], include=[]) => {
  if(pos === 'out') {
    if(include.length !== 0) {
      if(include.every(x => visited.includes(x)))
        return 1
      return 0
    } else {
      return 1
    }
  }
  let paths = 0
  graph[pos].forEach(dev => {
    if(!visited.includes(dev)) {
      paths += countPaths(graph, dev, [...visited, dev], include)
    }
  })
  return paths
}

const time = Date.now()
const part1 = countPaths(parse(input), 'you')
const time2 = Date.now()
console.log(`Part 1 Time: ${time2 - time}ms`)
const part2 = countPaths(parse(input), 'svr', [], ['dac', 'fft'])
console.log({part1, part2})