const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(line => line.split(' ').map(Number))

const getNext = line => {
  const next = []
  line.reduce((prev, curr) => {
    next.push(curr - prev)
    return curr
  })
  return next
}

const nextValue = line => {
  const next = getNext(line)
  return next.every(n => n === 0) ? next[next.length-1] : next[next.length-1] + nextValue(next)
}

const prevValue = line => {
  const next = getNext(line)
  return next.every(n => n === 0) ? next[0] : next[0] - prevValue(next)
}

const getNextValues = history => history.reduce((acc, line) => acc + nextValue(line) + line[line.length-1], 0)
const getPrevValues = history => history.reduce((acc, line) => acc + line[0] - prevValue(line), 0)

const part1 = getNextValues(parse(input))
const part2 = getPrevValues(parse(input))
console.log({part1, part2})
