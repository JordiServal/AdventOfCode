const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input2.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').reduce((obj, l) => {
  let [origin, destinies] = l.split(': ')
  obj[origin] = destinies.split(' ')
  return obj
}, {})

const countPaths = (graph, pos, destiny, visited=[]) => {
  if(pos === destiny)
    return 1
  if(!graph[pos])
    return 0
  
  let paths = 0
  graph[pos].forEach(dev => {
    if(!visited.includes(dev)) {
      paths += countPaths(graph, dev, destiny, [...visited, dev])
    }
  })
  return paths
}

const time = Date.now()
const part0 = countPaths(parse(input), 'you', 'out')
const time2 = Date.now()
console.log(`Part you-out Time: ${time2 - time}ms`)
const part1 = countPaths(parse(input), 'svr', 'dac')
const time3 = Date.now()
console.log(`Part svr-dac: ${time3 - time2}ms`)
const part2 = countPaths(parse(input), 'dac', 'fft')
const time4 = Date.now()
console.log(`Part dac-fft Time: ${time4 - time3}ms`)
const part3 = countPaths(parse(input), 'fft', 'out')
const time5 = Date.now()
console.log(`Part fft-out Time: ${time5 - time4}ms`)
const part4 = countPaths(parse(input), 'svr', 'fft')
const time6 = Date.now()
console.log(`Part svr-fft Time: ${time6 - time5}ms`)
const part5 = countPaths(parse(input), 'fft', 'dac')
const time7 = Date.now()
console.log(`Part fft-dac Time: ${time7 - time6}ms`)
const part6 = countPaths(parse(input), 'dac', 'out')
const time8 = Date.now()
console.log(`Part dac-out Time: ${time8 - time7}ms`)
console.log({part1: part0, part2: (part1 * part2 * part3) + (part4 * part5 * part6)})