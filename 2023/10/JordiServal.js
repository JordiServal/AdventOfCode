const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(line => line.split(''))

const pipeTypes = {
  '|': [{x: 0, y: -1}, {x: 0, y: 1}],
  '-': [{x: -1, y: 0}, {x: 1, y: 0}],
  'L': [{x: 0, y: -1}, {x: 1, y: 0}],
  'J': [{x: 0, y: -1}, {x: -1, y: 0}],
  '7': [{x: 0, y: 1}, {x: -1, y: 0}],
  'F': [{x: 0, y: 1}, {x: 1, y: 0}],
  'S': [{x: 0, y: 1}, {x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}],
}

const expandTypes = {
  '|': [
    ['F',' ','F'],
    ['F',' ','F'],
    ['F',' ','F'],
  ],
  '-': [
    ['F','F','F'],
    [' ',' ',' '],
    ['F','F','F'],
  ],
  'L': [
    ['F',' ','F'],
    ['F',' ',' '],
    ['F','F','F'],
  ],
  'J': [
    ['F',' ','F'],
    [' ',' ','F'],
    ['F','F','F'],
  ],
  '7': [
    ['F','F','F'],
    [' ',' ','F'],
    ['F',' ','F'],
  ],
  'F': [
    ['F','F','F'],
    ['F',' ',' '],
    ['F',' ','F'],
  ],
  'S': [
    ['F',' ','F'],
    [' ',' ',' '],
    ['F',' ','F'],
  ],
  'und': [
    ['F','F','F'],
    ['F','F','F'],
    ['F','F','F'],
  ],
}

const flood = (pipes, col, row) => {
  const fillStack = []
  fillStack.push([col, row]);
    
  while(fillStack.length > 0)
  {
    var [col, row] = fillStack.shift();
    
    if (!pipes[row] || !pipes[row][col] || pipes[row][col] == 'O')
        continue;
    
    pipes[row][col] = 'O'

    if(pipes[row][col+1] && pipes[row][col+1] === 'F') fillStack.push([col + 1, row])
    if(col > 0 && pipes[row][col-1] === 'F') fillStack.push([col - 1, row])
    if(pipes[row+1] && pipes[row+1][col] === 'F') fillStack.push([col, row+1])
    if(row > 0 && pipes[row-1][col] === 'F') fillStack.push([col, row-1])
  }

  return pipes
}

const getFarPoint = pipes => {
  let SY, SX
  pipes = pipes.map((line, y) => line.map((pipe, x) => {
    if(pipe === 'S') {
      SY = y
      SX = x
    } else if(pipe === '.') return undefined
    return { directions: pipeTypes[pipe], coords: {x, y}, visited: false, value: pipe}
  }))

  let current, steps = 0, nextDir
  do {
    current = pipes[SY][SX]
    current.visited = true
    nextDir = current.directions.find(dir => {
      const next = pipes[SY + dir.y][SX + dir.x]
      return next && !next.visited
    })
    if(nextDir) {
      SY += nextDir.y
      SX += nextDir.x
    }
    steps++
  } while(nextDir)

  // Expand
  let expPipe = Array(pipes.length * 3).fill('').map(x => [])
  pipes.forEach((line, indexLine) => {
    line.forEach(pipe => {
      let tiles
      if(!pipe || !pipe.visited) {
        tiles = expandTypes.und
      } else {
        tiles = expandTypes[pipe.value]
      }
      const expIndex = indexLine * 3 + 1
      expPipe[expIndex-1].push(...tiles[0])
      expPipe[expIndex].push(...tiles[1])
      expPipe[expIndex + 1].push(...tiles[2])
    })
  })

  expPipe = flood(expPipe, 0, 0)

  // console.log(expPipe.map(l => l.join('')).join('\n'))
  
  let inArea = 0
  for(let row = 1; row < expPipe.length - 2; row += 3){
    for(let col = 1; col < expPipe[row].length - 2; col += 3){
      if(expPipe[row][col] === 'F') inArea += 1
    }
  }

  return [steps / 2, inArea]
}

const [part1, part2] = getFarPoint(parse(input))

console.log({part1, part2})
