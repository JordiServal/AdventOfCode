const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split('')

const lookAndSay = (input, iterations) => {
  input.push('')
  const output = input.reduce((acc, char) => {
    if(!acc.lastChar) return {lastChar: char, count: 1, acc: ''}
    if(acc.lastChar === char) return {lastChar: char, count: acc.count + 1, acc: acc.acc}
    else return {lastChar: char, count: 1, acc: acc.acc + acc.count + acc.lastChar}
  }, {
    acc: '',
    count: 1
  })
  return iterations === 1 ? output.acc : lookAndSay(output.acc.split(''), iterations - 1)
}

const part1 = lookAndSay(input, 40);

const part2 = lookAndSay(part1.split(''), 10);

console.log({ part1: part1.length, part2:  part2.length });