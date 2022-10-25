const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const sumNumbers = (input) => {
  const keys = Object.keys(input);
  return keys.reduce((acc, key) => {
    const item = input[key];
    if (typeof item === 'number') return acc + item
    if (typeof item === 'object' || Array.isArray(item)) return acc + sumNumbers(item)
    return acc
  }, 0)
}

const sumNumbersRed = (input) => {
  const keys = Object.keys(input);
  return keys.reduce((acc, key) => {
    const item = input[key];
    if (typeof item === 'number') return acc + item
    if (typeof item === 'object' && !Object.values(item).includes('red') || Array.isArray(item)) 
      return acc + sumNumbersRed(item)
    return acc
  }, 0)
}

const part1 = sumNumbers(JSON.parse(input));

const part2 = sumNumbersRed(JSON.parse(input));

console.log({ part1: part1, part2:  part2 });