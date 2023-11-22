const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(line => line.trim().split(/\s+/).map(Number))

const possibleTriangles = triangles => triangles.filter(triangle => {
  triangle = triangle.sort((a, b) => a-b)
  return triangle[0] + triangle[1] > triangle[2]
})

const rearrangeInput = input => {
  const newTriangles = []
  while(input.length > 0) {
    const chunk = input.splice(0, 3)
    const newChunk = []
    chunk.forEach((row, i) => {
      row.forEach((column, j) => {
        if(!newChunk[j]) newChunk[j] = []
        newChunk[j][i] = column
      })
    })
    newTriangles.push(...newChunk)
  }
  return newTriangles
}

const part1 = possibleTriangles(parse(input)).length
const part2 = possibleTriangles(rearrangeInput(parse(input))).length

console.log({part1, part2})