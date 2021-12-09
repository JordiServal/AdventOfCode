let input = `2199943210
3987894921
9856789892
8767896789
9899965678`

const parseInput = (i) => {
  return i.split('\n').map(line => line.split('').map(v => {return {
    value: parseInt(v), 
    basin: false
  }}))
}

const checkAdjacents = (value, x, y, array) => {
  const x1 = x-1
  const x2 = x+1
  const y1 = y-1
  const y2 = y+1
  if(x1 !== -1 && array[y][x1].value <= value) return false
  if(x2 !== array[y].length && array[y][x2].value <= value) return false
  if(y1 !== -1 && array[y1][x].value <= value) return false
  if(y2 !== array.length && array[y2][x].value <= value) return false
  return true
}

const getBasin = (x, y) => {
  if(input[y][x].basin) {
    return 0
  }
  input[y][x].basin = true
  let count = 1
  const x1 = x-1
  const x2 = x+1
  const y1 = y-1
  const y2 = y+1
  if(x1 !== -1 && input[y][x1].value !== 9) count += getBasin(x1, y)
  if(x2 !== input[y].length && input[y][x2].value !== 9) count += getBasin(x2, y)
  if(y1 !== -1 && input[y1][x].value !== 9) count += getBasin(x, y1)
  if(y2 !== input.length && input[y2][x].value !== 9) count += getBasin(x, y2)
  return count
  
}

const getBasins = (i) => {
  const basins = i.reduce((risk, line, y) => {
    return [...risk, ...line.reduce((lineRisk, value, x) => {
        if(checkAdjacents(value.value, x, y, i)) {
          lineRisk.push(getBasin(x, y))
        }
        return lineRisk
    }, [])]
  }, [])
  basins.sort((a,b) => b-a)
  return basins.slice(0, 3).reduce((acc, basin) => acc * basin, 1)
}

const getLowPointRisk = (i) => {
  return i.reduce((risk, line, y) => {
    return risk + line.reduce((lineRisk, value, x) => {
      return lineRisk + (checkAdjacents(value.value, x, y, i) ? value.value+1 : 0)
    }, 0)
  }, 0)
}

input = parseInput(input)

console.log("Low point ratio", getLowPointRisk(input))
console.log("Basins: ", getBasins(input))