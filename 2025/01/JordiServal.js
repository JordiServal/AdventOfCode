const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse= (i) => i.split('\n').map(x => {
  const parts = x.split('')
  const op = parts.shift()
  const num = parseInt(parts.join(''))
  return [op, num]
})

const followOrders = (orders) => {
  let zero = 0, zero2 = 0, position = 50
  for(const curr of orders) {
    const dir = curr[0] === "L" ? -1 : 1
    for(let i = 0; i<curr[1]; i++) {
      position += dir
      if(position > 99) position = 0
      if(position < 0) position = 99
      if(position === 0) zero2++
    }
    if(position === 0) zero++
  }
  return [zero, zero2]
}


const [part1, part2] = followOrders(parse(input))

console.log({part1, part2})