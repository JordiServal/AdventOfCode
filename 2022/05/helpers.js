const path = require("path");
const fs = require("fs");
const [ins, mov] = fs
  .readFileSync(path.join(__dirname, "inputManu.txt"), "utf8")
  .split('\n\n')

let instructions = ins.split('\n')
  instructions = instructions
  .map((i, index) => {
    return index !== ins.length && i.replaceAll('[', '').replaceAll(']', '')
  })
  .map((i, index) => {
    return index !== ins.length - 1 && i.replaceAll('  ', ' ')
  })
  .map((i, index) => {
    return index === instructions.length - 1 ? i.replaceAll('  ', ' ').trimStart().trimEnd() : i
  })
  .map((i) => i.replaceAll('  ', ' '))
  .map((i) => i.split(' '))
  .reverse()
  .reduce((acc, curr, index) => {
    if (index === 0) return acc
    curr.forEach((c, i) => {
      if (c !== '') {
        if (!acc.hasOwnProperty(i)) {
          acc[i] = [c]
        } else {
          acc[i].push(c)
        }
      }
    })
    return acc 
  }, {})

const movements = mov.trim().split('\n').reduce((acc, cur) => {
  const [, number, , from, , to] = cur.split(' ')
  return [...acc, {number: +number, from: +from, to: +to}]
}, [])


module.exports = { movements, instructions }
