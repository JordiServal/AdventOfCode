const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => parseInt(i)

const makeSpiral = (num) => {
  let dirX = 1, dirY = 0, segmentLength = 1, x = 0, y = 0, segmentPassed = 0, spiral = ['0,0']
  for (let i = 2; i <= num; ++i) {
    x += dirX
    y += dirY
    ++segmentPassed
    if(segmentPassed == segmentLength){
      segmentPassed = 0
      let aux = dirX
      dirX = -dirY
      dirY = aux

      if(dirY == 0) ++segmentLength
    }
  }
  return Math.abs(x) + Math.abs(y) 
}

const makeAdjSpiral = (num) => {
  let dirX = 1, dirY = 0, segmentLength = 1, x = 0, y = 0, segmentPassed = 0, spiral = {'0,0': 1}, cell = 0
  while(cell <= num) {
    cell = 0
    x += dirX
    y += dirY
    ++segmentPassed
    if(spiral[x + ',' + (y - 1)]) {
      cell += spiral[x + ',' + (y - 1)]}
    if(spiral[(x - 1) + ',' + (y - 1)]) {
      cell += spiral[(x - 1) + ',' + (y - 1)]}
    if(spiral[(x - 1) + ',' + y]) {
      cell += spiral[(x - 1) + ',' + y]}
    if(spiral[(x - 1) + ',' + (y + 1)]) {
      cell += spiral[(x - 1) + ',' + (y + 1)]}
    if(spiral[x + ',' + (y + 1)]) {
      cell += spiral[x + ',' + (y + 1)]}
    if(spiral[(x + 1) + ',' + (y + 1)]) {
      cell += spiral[(x + 1) + ',' + (y + 1)]}
    if(spiral[(x + 1) + ',' + y]) {
      cell += spiral[(x + 1) + ',' + y]}
    if(spiral[(x + 1) + ',' + (y - 1)]) {
      cell += spiral[(x + 1) + ',' + (y - 1)]}

    if(segmentPassed == segmentLength){
      segmentPassed = 0
      let aux = dirX
      dirX = -dirY
      dirY = aux
      
      if(dirY == 0) ++segmentLength
    }
    spiral[x + ',' + y] = cell
  }
  return cell
}

const part1 = makeSpiral(parse(input))
const part2 = makeAdjSpiral(parse(input))

console.log({part1, part2})