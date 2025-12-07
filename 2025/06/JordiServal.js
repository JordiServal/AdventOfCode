const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const transpose = arr => arr[0].map((col, i) => arr.map(row => row[i]))
const parse = i => transpose(i.split('\n').map(l => l.split(/\s+/g).filter(x => x !== '')))
const parse2 = i => {
  let matrix = i.split('\n')
  const ops = matrix.pop().split(/\s+/g)
  matrix = transpose(matrix.map(l => l.split(''))).map(l => l.join('')).join('\n').replaceAll(' ', '').split('\n')
  let prevI = 0
  const newMatrix = []
  for(let i = 0; i<matrix.length; i++) {
    if(matrix[i] === '') {
        newMatrix.push([...matrix.slice(prevI, i), ops.shift()])
        prevI = i + 1
      }
    }
    newMatrix.push([...matrix.slice(prevI, matrix.length), ops.shift()])
  return newMatrix
}

const getMath = table => {
  const ops = {
    '+': (a, b) => a + b,
    '*': (a, b)=> a*b
  }
  return table.reduce((acc, curr) => {
    const op = curr.pop()
    return acc + curr.map(Number).reduce((a, b) => ops[op](a, b))  
  }, 0)
}

const part1 = getMath(parse(input))
const part2 = getMath(parse2(input))

console.log({part1, part2})