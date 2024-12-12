const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split(/\s+/).map(l => l.split('').map(c => { return {value: c, visited: false}}))

const checkAreaPerim = (map, x, y) => {
  map[y][x].visited = true
  const value = map[y][x].value
  let area = 1, perimeter = 0
  if(y-1 >= 0 && map[y-1][x].value === value ) {
    if(!map[y-1][x].visited) {
      let [auxArea, auxPerim] = checkAreaPerim(map, x, y-1)
      area += auxArea
      perimeter += auxPerim
    }
  } else perimeter ++
  if(y+1 < map.length && map[y+1][x].value === value ) {
    if(!map[y+1][x].visited) {
      let [auxArea, auxPerim] = checkAreaPerim(map, x, y+1)
      area += auxArea
      perimeter += auxPerim
    }
  } else perimeter ++
  if(x-1 >= 0 && map[y][x-1].value === value ) {
    if(!map[y][x-1].visited) {
      let [auxArea, auxPerim] = checkAreaPerim(map, x-1, y)
      area += auxArea
      perimeter += auxPerim
    }
  } else perimeter ++
  if(x+1 < map[0].length && map[y][x+1].value === value ) {
    if(!map[y][x+1].visited) {
      let [auxArea, auxPerim] = checkAreaPerim(map, x+1, y)
      area += auxArea
      perimeter += auxPerim
    }
  } else perimeter ++

  return [area, perimeter]
}

const checkAreaSides = (map, x, y) => {
  map[y][x].visited = true
  const value = map[y][x].value
  let area = 1, corners = {}
  if(y-1 >= 0) {
    if(map[y-1][x].value === value ) {
      if(!map[y-1][x].visited) {
        let [auxArea, auxCorners] = checkAreaSides(map, x, y-1)
        area += auxArea
        corners = {...corners, ...auxCorners}
      }
      if(x-1 >= 0 && map[y][x-1].value === value && map[y-1][x-1].value !== value) {
        corners[`${x}-${y}-ul`] = 1
      }
      if(x+1 < map[0].length && map[y][x+1].value === value && map[y-1][x+1].value !== value) {
        corners[`${x}-${y}-ur`] = 1
      }
    } else {
      if(x - 1 < 0 || map[y][x-1].value !== value) {
        corners[`${x}-${y}-ul`] = 1
      } 
      if(x + 1 >= map[0].length || map[y][x+1].value !== value){
        corners[`${x}-${y}-ur`] = 1
      }
    }
  } else {
    if(x - 1 < 0 || map[y][x-1].value !== value) {
    corners[`${x}-${y}-ul`] = 1
    } 
    if(x + 1 >= map[0].length || map[y][x+1].value !== value){
      corners[`${x}-${y}-ur`] = 1
    }
  }

  if(y+1 < map.length) {
    if(map[y+1][x].value === value ) {
      if(!map[y+1][x].visited) {
        let [auxArea, auxCorners] = checkAreaSides(map, x, y+1)
        area += auxArea
        corners = {...corners, ...auxCorners}
      }
      if(x-1 >= 0 && map[y][x-1].value === value && map[y+1][x-1].value !== value) {
        corners[`${x}-${y}-dl`] = 1
      }
      if(x+1 < map[0].length && map[y][x+1].value === value && map[y+1][x+1].value !== value) {
        corners[`${x}-${y}-dr`] = 1
      }
    } else {
      if(x - 1 < 0 || map[y][x-1].value !== value) {
        corners[`${x}-${y}-dl`] = 1
      } 
      if(x + 1 >= map[0].length || map[y][x+1].value !== value){
        corners[`${x}-${y}-dr`] = 1
      }
    }
  } else {
    if(x - 1 < 0 || map[y][x-1].value !== value) {
    corners[`${x}-${y}-dl`] = 1
    } 
    if(x + 1 >= map[0].length || map[y][x+1].value !== value){
      corners[`${x}-${y}-dr`] = 1
    }
  }
  if(x-1 >= 0 && map[y][x-1].value === value ) {
    if(!map[y][x-1].visited) {
      let [auxArea, auxCorners] = checkAreaSides(map, x-1, y)
      area += auxArea
      corners = {...corners, ...auxCorners}
    }
  } 
  if(x+1 < map[0].length && map[y][x+1].value === value ) {
    if(!map[y][x+1].visited) {
      let [auxArea, auxCorners] = checkAreaSides(map, x+1, y)
      area += auxArea
      corners = {...corners, ...auxCorners}
    }
  } 

  return [area, corners]
}

const getPrice = (map, sides) => {
  let price = 0
  map.forEach((line, y) => {
    line.forEach((c, x) => {
      if(c.visited) return 
      const [area, perimeter] = sides ? checkAreaSides(map, x, y) : checkAreaPerim(map, x, y)
      price += area * (sides ? Object.keys(perimeter).length : perimeter)
    })
  })
  return price
}

const part1 = getPrice(parse(input), false)
const part2 = getPrice(parse(input), true)

console.log({part1, part2})