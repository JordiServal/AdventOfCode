const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse= (i) => i.split('\n').map(x => x.split(/\s+/))

const getDiffs = locations => {
  let locationA = []
  let locationB = []
  locations.forEach(([sideA, sideB]) => {
    locationA.push(sideA)
    locationB.push(sideB)
  });
  locationA.sort((a, b) => a - b)
  locationB.sort((a, b) => a - b)

  return locationA.reduce((sum, pair, i) => {
    return [sum[0] + Math.abs(pair - locationB[i]),
      sum[1] + pair * locationB.filter(p => p === pair).length]
  }, [0, 0])
}

const [part1, part2] = getDiffs(parse(input))

console.log({part1, part2})