const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")

const parseInput = (input) => {
  return input.map((line) => {
    const split =line.replaceAll(':', '').split(" ");
    return {
      name: split[1],
      [split[2]]: parseInt(split[3]),
      [split[4]]: parseInt(split[5]),
      [split[6]]: parseInt(split[7]),
    }
  })
}

const checkCoincidence = (evidence, suspects) => {
  return suspects.filter(suspect => {
    return Object.keys(evidence).reduce((checks, key) => {
      return evidence[key] === suspect[key] ? checks + 1 : checks
    }, 0) === 3
  })[0].name
}

const checkCoincidence2 = (evidence, suspects, greater, fewer) => {
  return suspects.filter(suspect => {
    return Object.keys(evidence).reduce((checks, key) => {
      return greater.includes(key) ? evidence[key] < suspect[key] ? checks + 1 : checks :
             fewer.includes(key) ? evidence[key] > suspect[key] ? checks + 1 : checks :
             evidence[key] === suspect[key] ? checks + 1 : checks
    }, 0) === 3
  })[0].name
}

const aunts = parseInput(input)

const sender = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
}

const greater = ['cats', 'trees']
const fewer = ['pomeranians', 'goldfish']

const part1 = checkCoincidence(sender, aunts)

const part2 = checkCoincidence2(sender, aunts, greater, fewer)

console.log({ part1, part2 });