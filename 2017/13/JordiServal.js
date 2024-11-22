const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => i.split('\n').map(line => line.split(': ').map(Number))

const getColissions = (firewall, delay) => {
  return firewall.reduce((total, [index, length]) => {
    return ((index + delay) % (length * 2 - 2) === 0) ? total += index * length : total 
  }, 0)
}
const getColissions2 = (firewall, delay) => {
  return firewall.reduce((total, [index, length]) => {
    return ((index + delay) % (length * 2 - 2) === 0) ? [...total, index] : total 
  }, [])
}

const getDelay = firewall => {
  let delay = 0
  while (getColissions2(firewall, delay).length !== 0) {
    delay++
  }
  return delay
}
 
const part1 = getColissions(parse(input), 0)
const part2 = getDelay(parse(input))
console.log({part1, part2})       