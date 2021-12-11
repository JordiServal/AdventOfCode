const input = `1443582148
6553734851
1451741246
8835218864
1662317262
1731656623
1128178367
5842351665
6677326843
7381433267`

const parseInput = (i) => {
  i = i.split('\n')
  return i.map((line) => line.split('').map(oct => { return {n: parseInt(oct), flashed: false}}))
}

const addEnergy = (i) => {
  return i.map((line) => line.map((oct) => { return {n: oct.n + 1, flashed: oct.flashed }} ))
}

const flash = (i, x, y) => {
  i[y][x].flashed = true
  const x1 = x - 1
  const x2 = x + 1
  const y1 = y - 1
  const y2 = y + 1
  if(x1 !== -1) { if(++i[y][x1].n >= 10 && !i[y][x1].flashed) i=flash(i, x1, y)}
  if(x1 !== -1 && y1 !== -1) { if(++i[y1][x1].n >= 10 && !i[y1][x1].flashed) i=flash(i, x1, y1)}
  if(x1 !== -1 && y2 !== i.length) { if(++i[y2][x1].n >= 10 && !i[y2][x1].flashed) i=flash(i, x1, y2)}
  if(y1 !== -1) { if(++i[y1][x].n >= 10 && !i[y1][x].flashed) i=flash(i, x, y1)}
  if(x2 !== i[y].length && y1 !== -1) { if(++i[y1][x2].n >= 10 && !i[y1][x2].flashed) i=flash(i, x2, y1)}
  if(x2 !== i[y].length) { if(++i[y][x2].n >= 10 && !i[y][x2].flashed) i=flash(i, x2, y)}
  if(x2 !== i[y].length && y2 !== i.length) { if(++i[y2][x2].n >= 10 && !i[y2][x2].flashed) i=flash(i, x2, y2)}
  if(y2 !== i.length) { if(++i[y2][x].n >= 10 && !i[y2][x].flashed) i=flash(i, x, y2)}
  return i
}

const releaseEnergy = (i) => {
  i.forEach((line, y) => {
    line.forEach((oct, x) => {
    if(oct.n >= 10 && !oct.flashed) {
      i=flash(i,x,y)
    }
  })})
  return i
}

let flashes = 0

const resetEnergy = (i) => {
  return i.map(line => line.map(oct => {
    if(oct.flashed) {
      flashes ++
      return {n:0, flashed:false}
    }
    return oct
  }))
}

const countFlashes = (i, steps) => {
  for(let x = 1; x <= steps; x++){
    i = addEnergy(i)
    i = releaseEnergy(i)
    i = resetEnergy(i)
    if(flashes === i.length * i[0].length) {
      console.log("Full light", x)
      break
    } else flashes = 0
  }
  console.log(i)
  return flashes
}

const totalSteps = 500
console.log(`Total flashes ${totalSteps} steps`, countFlashes(parseInput(input), totalSteps))