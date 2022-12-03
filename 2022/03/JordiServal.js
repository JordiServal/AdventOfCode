const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.trim());

const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getSumPriority = (input) => {
  return input.reduce((acc, curr) => {
    curr = curr.split('')
    const firstCompartment = curr.splice(0, curr.length/2)
    const reps = curr.reduce((repeats, letter) => {
      if(firstCompartment.includes(letter)) {
        repeats[letter] = 1
      }
      return repeats
    }, {})
    return acc + Object.keys(reps).reduce((sum, letter) => sum + abc.indexOf(letter) + 1 , 0)
  }, 0)
}

const getBadge = (group) => {
  return group[0].split('').filter((letter) => group.every((elf) => elf.includes(letter)))[0]
}

const getBadgesPriority = (input) => {
  return input.reduce((acc, curr) => {
    acc.group.push(curr)
    if(acc.group.length === 3) {
      acc.sum += abc.indexOf(getBadge(acc.group)) + 1
      acc.group = []
    }

    return acc
  }, {group: [], sum: 0}).sum
}

const part1 = getSumPriority(input);
const part2 = getBadgesPriority(input);


console.log({part1, part2})