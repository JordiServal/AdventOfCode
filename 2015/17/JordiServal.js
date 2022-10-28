const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")

const parseInput = (input) => input.map((line) => parseInt(line, 10));

const containers = parseInput(input)
const powerSet = array => array.reduce((subsets, value) =>
  subsets.concat(
    subsets.map(set => [value,...set])
  )
,[[]])

const combinations = (containers, liters) => {
  return powerSet(containers).filter( combination => {
    return combination.reduce((sum, value) => sum + value, 0) === liters
  })
}

const minCombinations = (containers, liters) => {
  return combinations(containers, liters).reduce((acc, combination) => {
    acc.sum ++
    if(acc.min === undefined)
      return { ...acc, min: combination.length, count: 1 }
    if(acc.min === combination.length)
      return { ...acc, min: acc.min, count: acc.count + 1 }
    if(acc.min > combination.length)
      return { ...acc, min: combination.length, count: 1 }
    return acc 
  }, {count: 0, sum: 0})
}

const liters = 150

const {sum: part1, count: part2} = minCombinations(containers, liters)


console.log({ part1, part2 });