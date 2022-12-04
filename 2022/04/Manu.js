const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.join(__dirname, "inputManu.txt"), "utf8")
  .trim()
  .split('\n')

function mapPair(pair) {
  const [ini, fin] = pair.split('-')
  return Array.from({length: fin - ini + 1}, (_, i) => +ini + i)
}

const part1 = input.reduce((acc, curr) => {
  const pairs = curr.split(',');
  let a = mapPair(pairs[0]);
  let b = mapPair(pairs[1]);
  
  if (a.every(n => b.includes(n))) {
    return ++acc;
  }
  if (b.every(n => a.includes(n))) {
    return ++acc;
  }
  return acc;
}, 0)


const part2 = input.reduce((acc, curr) => {
  const pairs = curr.split(',');
  let a = mapPair(pairs[0]);
  let b = mapPair(pairs[1]);
  
  if (a.some(n => b.includes(n))) {
    return ++acc;
  }
  if (b.some(n => a.includes(n))) {
    return ++acc;
  }
  return acc;
}, 0)

console.log(part1);
console.log(part2);
