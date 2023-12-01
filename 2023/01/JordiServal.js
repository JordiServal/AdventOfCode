const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(x => x.trim())

const getCalibration = values => {
  return values.reduce((acc, val) => {
    val = val.split(/\D+/).filter(Number).join('').split('').map(Number)
    return acc + parseInt(`${val[0]}${val[val.length-1]}`)
  }, 0)
}

const getNewCalibration = values => {
  const words = ['zero','one','two','three','four','five','six','seven','eight','nine']
  return values.reduce((acc, val) => {
    let match, matches = []
    while (match = val.match(/one|two|three|four|five|six|seven|eight|nine|[0-9]/)) {
      matches.push(match[0])
      val = val.slice(match.index + 1)
    }
    val = matches.map(v => {
      const index = words.indexOf(v)
      return index !== -1 ? index : parseInt(v)
    })
    return acc + parseInt(`${val[0]}${val[val.length-1]}`)
  }, 0)
  
}

const part1 = getCalibration(parse(input))
const part2 = getNewCalibration(parse(input))

console.log({part1, part2})
