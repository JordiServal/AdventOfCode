const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(e => e.trim().split(''))
const rotateMatrix = matrix => matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
const checkLoad = matrix => {
  let load = 0

  for(let y=0; y<matrix.length; y++) {
    for(let x=0; x < matrix[y].length; x++){
      if(matrix[y][x] === 'O') load += matrix.length-y
    }
  }
  return load
}
const moveUp = dish => {
  let change = true, load = 0
      while(change) {
        change = false
        for(let y=1; y<dish.length; y++) {
          for(let x=0; x < dish[y].length; x++){
            if(dish[y][x] === 'O' && dish[y-1][x] === '.') {
              dish[y][x] = '.'
              dish[y-1][x] = 'O'
              change = true
            }
          }
        }
      }

  return checkLoad(dish)
}

const moveUpCycle = dish => {
  let load = 0, total = 10, dishAux = ''
  for(let iter = 1; iter <= total; iter += 1) {
    dishAux = JSON.parse(JSON.stringify(dish))
    load = 0
    for(let loop = 0; loop < 4 * iter; loop++) {
      let change = true
      while(change) {
        change = false
        for(let y=1; y<dishAux.length; y++) {
          for(let x=0; x < dishAux[y].length; x++){
            if(dishAux[y][x] === 'O' && dishAux[y-1][x] === '.') {
              dishAux[y][x] = '.'
              dishAux[y-1][x] = 'O'
              change = true
            }
          }
        }
      }
      dishAux = rotateMatrix(dishAux)
    }
    load = checkLoad(dishAux)
    console.log(load)
  }
  return load
}

const part1 = moveUp(parse(input))
const part2 = moveUpCycle(parse(input))
console.log({part1, part2})

// It generates a cycle after 162 loops and keep repeating the same 18 number pattern
console.log((1000000000-162) % 18)
