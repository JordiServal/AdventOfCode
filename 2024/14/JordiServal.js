const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').map(machine => machine.replaceAll(/p|=|v/g, '').split(' ').map(n => n.split(',').map(Number)))

const width = 101, height = 103, seconds = 100

const checkQuadrants = guards => {
  const room = guards.reduce((rest, [pos, vel]) => {
    pos = [(pos[0] + vel[0] * seconds) % width, (pos[1] + vel[1] * seconds) % height]
    pos[0] = pos[0] < 0 ? width + pos[0] : pos[0]
    pos[1] = pos[1] < 0 ? height + pos[1] : pos[1]
    rest[pos] = (rest[pos] || 0) + 1
    return rest
  }, {})
  const middleH = Math.floor(height/2), middleW = Math.floor(width/2)
  return Object.values(Object.entries(room).reduce((q, [key, num]) => {
    let [x, y] = key.split(',').map(Number)
    if(x === middleW || y === middleH) return q
    const pos = [Math.floor(x / (middleW+1)), Math.floor(y/(middleH+1))].join(',')
    q[pos] = (q[pos] || 0) + num
    return q
  }, {})).reduce((acc, cur) => acc * cur)
}


const lookForTree = guards => {
  const display = Array(height).fill('.').map(l => Array(width).fill('.'))
  let text = ''
  for(let i=1; i<10000;i++) {
    text += `\n\n Loop ${i} \n`
    const displayAux = JSON.parse(JSON.stringify(display))
    guards.forEach(([pos, vel]) => {
      pos = [(pos[0] + vel[0] * i) % width, (pos[1] + vel[1] * i) % height]
      pos[0] = pos[0] < 0 ? width + pos[0] : pos[0]
      pos[1] = pos[1] < 0 ? height + pos[1] : pos[1]
      displayAux[pos[1]][pos[0]] = '#'
    })
    text += displayAux.map(l => l.join('')).join('\n')
  }
  console.log(text)
}
const part1 = checkQuadrants(parse(input))
const part2 = lookForTree(parse(input))

console.log(part1)