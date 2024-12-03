const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => i.split('\n').map(x => x.split(/\s+/).map(Number))

const inc = (a, b) => a > b && a <= b + 3
const dec = (a, b) => a < b && a >= b - 3

const checker = (report, damped) => {
  let comp = true, orientation = inc
  if(report[0] < report[1]) orientation = dec
  else if(report[0] === report [1]) return false
  
  for(let i = 0; i<report.length - 1 && comp; i++) {
    comp = orientation(report[i], report[i+1])
  }
  return comp
}

const checkReports = reports => {
  return reports.map(rep => checker(rep, true)).filter(r => r).length
}

const problemDampener = reports => {
  return reports.map(rep => {
    return checker(rep, false) || rep.some((_, i) => checker(rep.filter((_, j) => i !== j)))
  }).filter(r => r).length
}

const part1 = checkReports(parse(input))
const part2 = problemDampener(parse(input))

console.log({part1, part2})