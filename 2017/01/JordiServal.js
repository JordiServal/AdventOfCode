const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => i.split('').map(Number)

const getMatches = (i) => {
  const nextMatches = [0], len = i.length, halfMatches = [0], half = len / 2
  for(let x = 0; x < len; x++) {
    if( i[x] == i[(x + 1) % len]) {
      nextMatches.push(i[x])
    }
    if( i[x] == i[(x + half) % len]) {
      halfMatches.push(i[x])
    }
    
  }

  return [nextMatches.reduce((a, b) => a + b), halfMatches.reduce((a, b) => a + b)]
}

const [part1, part2] = getMatches(parse(input))

console.log({part1, part2})