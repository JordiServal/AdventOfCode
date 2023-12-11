const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(line => line.trim().split(''))
const pairs = (arr) => arr.map( (v, i) => arr.slice(i + 1).map(w => [v, w]) ).flat();
const transpose = a => Object.keys(a[0]).map(c => a.map(r => r[c] ));

const expand = universe => {
  let added = 0
  JSON.parse(JSON.stringify(universe)).forEach((row, index) => {
    if(!row.includes('#')) {
      universe.splice(index + added, 0, row)
      added += 1
    }
  }); 
  return universe
}

const getShortestDistance = universe => {
  universe = expand(universe)
  universe = transpose(expand(transpose(universe)))
  const galaxies = []
  universe.forEach((line, row) => {
    line.forEach((point, col) => {
      if(point === '#') 
        galaxies.push([col, row])
    })
  })
  const paths = pairs(Object.keys(galaxies)).map(([a, b]) =>
    Math.abs(galaxies[a][0] - galaxies[b][0]) + Math.abs(galaxies[a][1] - galaxies[b][1])
  )
  return paths.reduce((acc, curr) => acc + curr)
}

const getShortestDistanceExpanded = universe => {
  let expRows = [], expCols = []
  universe.forEach((row, index) => {
    if(!row.includes('#')) {
      expRows.push(index)
    }
  }); 
  transpose(universe).forEach((col, index) => {
    if(!col.includes('#')) {
      expCols.push(index)
    }
  }); 
  let addedCols = 0, addedRows = 0, add = 999999, galaxies = []
  universe.forEach((line, row) => {
    if(expRows.includes(row)) {
      addedRows += add
    } else {
      line.forEach((point, col) => {
        if(expCols.includes(col)) {
          addedCols += add
        } else {
          if(point === '#') 
            galaxies.push([col + addedCols, row + addedRows])
        }
      })
      addedCols = 0
    }
  })
  
  const paths = pairs(Object.keys(galaxies)).map(([a, b]) =>
    Math.abs(galaxies[a][0] - galaxies[b][0]) + Math.abs(galaxies[a][1] - galaxies[b][1])
  )
  return paths.reduce((acc, curr) => acc + curr)
}

const part1 = getShortestDistance(parse(input))
const part2 = getShortestDistanceExpanded(parse(input))
console.log({part1, part2})
