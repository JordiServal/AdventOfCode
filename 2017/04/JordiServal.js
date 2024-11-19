const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => i.split('\n').map(row => row.split(/\s+/))

const validPassphrases = (list) => {
  return list.reduce((acc, pass) => {
    let check = 1, obj = {}
    pass.forEach(word => {
      if(obj[word] == 0) check = 0
      obj[word] = 0
    });
    return acc + check
  }, 0)
}

const validOrderPass = (list) => {
  return list.reduce((acc, pass) => {
    let check = 1, obj = {}
    pass.forEach(word => {
      word = word.split('').sort().join('')
      if(obj[word] == 0) check = 0
      obj[word] = 0
    });
    return acc + check
  }, 0)
}



const part1 = validPassphrases(parse(input))
const part2 = validOrderPass((parse(input)))

console.log({part1, part2})