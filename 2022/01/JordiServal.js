const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const countCalories = (elves) => elves.map((elf) => elf.split("\n").reduce((acc, meal) => {
  meal = parseInt(meal)
  return acc + (isNaN(meal) ? 0 : meal)
}, 0))


const topElf = (elves) => elves.reduce((acc, cal) => acc > cal ? acc : cal, 0)
const podiumElves = (elves) => {
  const podium = []
  for(let i = 0; i<3;i++) {
    const max = topElf(elves)
    const index = elves.indexOf(max)
    elves.splice(index, 1)
    podium.push(max)
  }
  return podium.reduce((acc, cur) => acc + cur, 0)
}

const elves = countCalories(input.split("\n\n"))

const part1 = topElf(elves)
const part2 = podiumElves(elves)

console.log({part1, part2})