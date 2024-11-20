const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => i.split('')

const getScore = groups => {
  let totalScore = 0, actualScore = 0, garbage = false, garbageChars = 0
  for(let i=0; i< groups.length; i++) {
    const char = groups[i]
    if(!garbage) {
      if(char === '{') {
        actualScore += 1
        totalScore += actualScore
      }
      if(char === '}') actualScore -= 1
      if(char === '<') garbage = true
    } else {
      if(char === '>') {
        garbage = false
      } else if(char === '!') i++
      else {
        garbageChars ++
      }
    }
  }
  return [totalScore, garbageChars]
}

const [part1, part2] = getScore(parse(input))

console.log({part1, part2})