const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(w => w.split(''))

const decodeSignal = words => {
  const columns = []
  words.forEach(word => {
    word.forEach((c, i) => {
      if(!columns[i]) columns[i] = {}
      if(!columns[i][c]) columns[i][c] = {letter: c, cont: 0}
      columns[i][c].cont += 1
    })
  });
  const orderedColumns = columns.map(col => Object.values(col).sort((a, b) => b.cont - a.cont))
  return {
    mostRep: orderedColumns.map(col => col.shift().letter).join(''),
    lessRep: orderedColumns.map(col => col.pop().letter).join(''),
  }
}

const {mostRep: part1, lessRep: part2} = decodeSignal(parse(input))

console.log({part1, part2})