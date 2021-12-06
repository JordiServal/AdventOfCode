const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

const parseInput = (i, diag) => {
  let max = {x: undefined, y: undefined}
  
  return {max, lines: i.split('\n').map((pair) => {
    let coord = pair.replace( / -> /g, "," ).split( "," ).map(value => parseInt(value))
    max.x = max.x === undefined || max.x < coord[0] ? coord[0] : max.x
    max.x = max.x === undefined || max.x < coord[2] ? coord[2] : max.x
    max.y = max.y === undefined || max.y < coord[1] ? coord[1] : max.y
    max.y = max.y === undefined || max.y < coord[3] ? coord[3] : max.y
    if(coord[0] === coord[2] || coord[1] === coord[3]){
      return {coord, diagonal: false}
    } else if(Math.abs(coord[0] - coord[2]) === Math.abs(coord[1] - coord[3]) && diag){
      return {coord, diagonal: true }
    }
    return undefined
  })}
}

const countDangerZones = (field, lines) => {
  return lines.reduce((dangerZones, currentCoord) => {
    if(currentCoord) {
      const x1 = currentCoord.coord[0] < currentCoord.coord[2] ? currentCoord.coord[0] : currentCoord.coord[2]
      const x2 =  currentCoord.coord[0] < currentCoord.coord[2] ? currentCoord.coord[2] : currentCoord.coord[0]
      if(!currentCoord.diagonal) {
        // Horizontal - Vertical
        const y1 = currentCoord.coord[1] < currentCoord.coord[3] ? currentCoord.coord[1] : currentCoord.coord[3]
        const y2 =  currentCoord.coord[1] < currentCoord.coord[3] ? currentCoord.coord[3] : currentCoord.coord[1]
        for(let x = x1; x <= x2; x++){
          for(let y = y1; y <= y2; y++){
            field[x][y]++
            if(field[x][y] === 2) dangerZones++
          }
        }
      } else {
        // Diagonal
        let y1 = currentCoord.coord[0] < currentCoord.coord[2] ? currentCoord.coord[1] : currentCoord.coord[3]
        const y2 =  currentCoord.coord[0] < currentCoord.coord[2] ? currentCoord.coord[3] : currentCoord.coord[1]
        const direction = y1 < y2 ? 1: -1
        for(let x = x1; x <= x2; x++, y1=y1+direction){
          field[x][y1]++
          if(field[x][y1] === 2) dangerZones++
        }
      }
    }
    return dangerZones
  }, 0)
}

const getDangerZones = (i, diag) => {
  const {lines, max} = parseInput(i, diag)
  let travelField = Array(max.x+1).fill().map(()=>Array(max.y+1).fill(0))
  console.log({travelField, lines, max})
  return countDangerZones(travelField, lines)
}

console.log("Danger zones: ", getDangerZones(input, false))
console.log("Danger zones diagonal: ", getDangerZones(input, true))