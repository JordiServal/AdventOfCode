const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .split("\n").map(x => x.split('').map(Number))

const checkVisible = (trees, value, x, y) => {
  let comp = true
  for(let i=0; i<y; i++) // check up
    if(trees[i][x] >= value) comp = false
  if(comp) return 1
  comp = true
  for(let i=y+1; i<trees.length; i++) // check down
    if(trees[i][x] >= value) comp = false
  if(comp) return 1
  comp = true
  for(let i=0; i<x; i++) // check left
    if(trees[y][i] >= value) comp = false
  if(comp) return 1
  comp = true
  for(let i=x+1; i<trees[0].length; i++) // check right
    if(trees[y][i] >= value) comp = false
  return comp
}
  
const getVisibleTrees = (trees) => {
  let visibleTrees = trees.length*2 + trees[0].length*2-4
  for(let y=1; y<trees.length-1; y++) {
    for(let x=1; x<trees[0].length-1; x++) {
      visibleTrees += checkVisible(trees, trees[y][x], x, y)
    }
  }
  return visibleTrees
}

const getScenic = (trees, tree, x, y) => {
  let total = 1, score = 0
  let comp = false
  for(let i=y-1; i>=0; i--) { // check up
    if(!comp) score++
    if(trees[i][x] >= tree) comp = true
  }
  total *= score
  score = comp = 0
  for(let i=y+1; i<trees.length; i++) { // check down
    if(!comp) score++
    if(trees[i][x] >= tree) comp = true
  }  
  total *= score
  score = comp = 0
  for(let i=x-1; i >= 0; i--) { // check left
    if(!comp) score++
    if(trees[y][i] >= tree) comp = true
  }
  total *= score
  score = comp = 0
  for(let i=x+1; i<trees[0].length; i++) { // check right
    if(!comp) score++
    if(trees[y][i] >= tree) comp = true
  }
  total *= score
  return total
}

const getMaxScore = (trees) => {
  let scores = []
  trees.forEach((row, y) => {
    row.forEach((tree, x) => {
      scores.push(getScenic(trees, tree, x, y))
    })
  })
  return scores.sort((a,b) => b-a)[0] // return max
}
  
const part1 = getVisibleTrees(input)
const part2 = getMaxScore(input)

console.log({part1, part2})