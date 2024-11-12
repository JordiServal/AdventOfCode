const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => i.split('\n').map(row => row.split(/\s+/).map(Number))
const sum = arr => arr.reduce((a, b) => a + b)
const getCheckSum = (matrix) => {
  return sum(matrix.reduce((acc, row) => {
    const {min, max} = row.reduce((nums, curr) => {
      nums.min = nums.min > curr ? curr : nums.min
      nums.max = nums.max < curr ? curr : nums.max
      return nums
    }, {min: Infinity, max: 0})
    return [...acc, max - min]
  }, []))
}

const getEvenSum = (matrix) => {
  return sum(matrix.reduce((acc, row) => {
    let even = 0
    for(let i = 0; i < row.length; i++) {
      for(let j=i+1; j < row.length; j++) {
        if(row[i] % row[j] === 0) {
          even = row[i] / row[j]
          break
        }
        if(row[j] % row[i] === 0) {
          even = row[j] / row[i]
          break
        }
      }
      if(even) break
    }
    return [...acc, even]
  }, []))
}

const part1 = getCheckSum(parse(input))
const part2 = getEvenSum(parse(input))

console.log({part1, part2})