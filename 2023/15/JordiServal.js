const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split(',').map(e => e.trim().split(''))

const getHashValue = hashes => {
  return hashes.reduce((acc, hash) => {
    return acc + hash.reduce((value, char) => ((value + char.charCodeAt(0)) * 17) % 256, 0)
  }, 0)
}

const part1 = getHashValue(parse(input))
const part2 = ''
console.log({part1, part2})