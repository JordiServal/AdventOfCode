const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').map(l => {
  let [result, operations] = l.split(': ')
  return {result: parseInt(result), operations: operations.split(' ').map(Number)}
})

const checkValid = (res, ops, sum) => {
  if(!ops.length) 
    return res === sum
  const first = ops.shift()
  return checkValid(res, [...ops], sum * first) || checkValid(res, [...ops], sum + first)
}

const checkValidExtra = (res, ops, sum) => {
  if(!ops.length) 
    return res === sum
  const first = ops.shift()
  return checkValidExtra(res, [...ops], sum * first) || checkValidExtra(res, [...ops], sum + first) || checkValidExtra(res, [...ops], parseInt
    (`${sum}${first}`))
}

const sumValidOps = (equations, extra) => {
  return equations.filter(({result, operations}) => {
    const first = operations.shift()
    return extra ? checkValidExtra(result, [...operations], first) : checkValid(result, [...operations], first)
  }).reduce((acc, curr) => acc + curr.result, 0)
}


console.time('p1')
const part1 = sumValidOps(parse(input))
console.timeEnd('p1')
console.time('p2')
const part2 = sumValidOps(parse(input), true)
console.timeEnd('p2')

console.log({part1, part2})