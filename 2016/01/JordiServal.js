const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split(', ')
const directions = [
  [1,0], // north
  [0,1], // west
  [-1,0], // south 
  [0,-1] // east
]
const movement = {R: 1, L: -1}

const getFinalPosition = moves => {
  let position = [0, 0]
  let dir = 0
  const visited = []
  let firstVisited = undefined
  moves.forEach(move => {
    const turn = move.slice(0,1)
    const blocks = parseInt(move.slice(1))
    dir += movement[turn]
    for(let i = 0; i<blocks; i++) {
      position = [
        position[0] + directions[dir % 4][0],
        position[1] + directions[dir % 4][1],
      ]
      if(visited.some(c => c === position.join(',')) && !firstVisited){
        firstVisited = position
      } 
  
      visited.push(position.join(','))
      
    }
  })
  return [position, firstVisited]
}

const getBlocksAway = moves => {
  const [position, firstVisited] = getFinalPosition(moves)
  return [
    Math.abs(position[0]) + Math.abs(position[1]),
    Math.abs(firstVisited[0]) + Math.abs(firstVisited[1]),
  ]
}



const part1 = getBlocksAway(parse(input))
const part2 = ''

console.log({part1, part2})