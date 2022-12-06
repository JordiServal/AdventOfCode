const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("")

const firstMarker = (signal) => {
  let marker = []
  let i = 0
  input.find((char, index) => {
    if(marker.length === 4) marker.shift()
    marker.push(char)
    // console.log({char, marker})
    if(marker.every(char => marker.join('').split(char).length === 2) && marker.length === 4) {
      i = index + 1
      return true
    }
    return false
  })
  return i
}

const longMarker = (signal) => {
  let marker = []
  let i = 0
  input.find((char, index) => {
    if(marker.length === 14) marker.shift()
    marker.push(char)
    // console.log({char, marker})
    if(marker.every(char => marker.join('').split(char).length === 2) && marker.length === 14) {
      i = index + 1
      return true
    }
    return false
  })
  return i
}

const part1 = firstMarker(input);
const part2 = longMarker(input);


console.log({part1, part2})