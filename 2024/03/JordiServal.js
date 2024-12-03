const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const getMult = memo => memo.match(/mul\(\d{1,3},\d{1,3}\)/g).map(str => str.replaceAll(/mul\(|\)/g, '').split(',').map(Number)).reduce((mult, num) => mult + num[0] * num[1], 0)

const getEnabledMult = memo => {
  let enabled = true
  const matches = memo.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g).map(str => {
    if(str.includes('do')) {
      enabled = str.includes("n't") ? false : true
      return false
    }
    return !enabled ? false : str.replaceAll(/mul\(|\)/g, '').split(',').map(Number)
  }).filter(n => n)
  return matches.reduce((mult, num) => mult + num[0] * num[1], 0)
}
console.time('p1')
const part1 = getMult(input)
console.timeEnd('p1')
console.time('p2')
const part2 = getEnabledMult(input)
console.timeEnd('p2')

console.log({part1, part2})