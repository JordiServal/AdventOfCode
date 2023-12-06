const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => {
  input = input.split('\n').map(l => l.trim().split(/\s+/).map(Number))
  input[0].shift()
  input[1].shift()
  return {times: input[0], records: input[1]}
}

const beatRecords = ({times, records}) => {
  return times.reduce((multiply, current, index) => {
    let beaten = 0
    const record = records[index]
    for(let i=1;i<current;i++) {
      if(i * (current-i) > record) beaten += 1
    }
    return beaten ? multiply * beaten : multiply
  }, 1)
}

const beatRecord = ({times, records}) => {
  times = parseInt(times.join(''))
  records = parseInt(records.join(''))
  let beaten = 0
  for(let i=1; i<times; i++) {
    if(i * (times - i) > records) beaten += 1
  }
  return beaten
}

const part1 = beatRecords(parse(input))
const part2 = beatRecord(parse(input))
console.log({part1, part2})
