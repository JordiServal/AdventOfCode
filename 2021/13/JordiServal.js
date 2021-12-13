const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`

const parseInput = (i) => {
  let [dots, folds] = i.split('\n\n')

  dots = dots.split('\n')
  // .map(coord => coord.split(',').map(Number))
  folds = folds.split('\n').map(fold => fold.split(' ').pop().split('='))
  return [dots, folds]
}

const foldSheet = (sheet, dir, point) => {
  dir = dir === 'x' ? 0 : 1
  sheet = sheet.map(dot => {
    let nDot = dot.split(',').map(Number)
    if(nDot[dir] === point) return undefined
    if(nDot[dir] < point) return dot
    let auxDot = [...nDot]
    auxDot[dir] = Math.abs(nDot[dir] -  2*point)
    auxDot = auxDot.join(',')
    if(sheet.includes(auxDot)) return undefined
    return auxDot
  })
  return sheet.filter(d => !!d)
}

const allFolds = (sheet, foldSteps) => {
  return foldSteps.reduce((foldedSheet, fold) => {
    return foldSheet(foldedSheet, fold[0], fold[1])
  }, sheet)
}

const drawMatrix = (sheet) => {
  const lights = Array(1000).fill().map(() => Array(1000).fill(false))

  let matrix = Array(6).fill().map(() => Array(40).fill('.'))
  sheet.forEach(dot => {
    dot = dot.split(',').map(Number)
    matrix[dot[0]][dot[1]] = '#'
  })
  return matrix.map(l => l.join(''))
}

let [inputSheet, folds] = parseInput(input)
console.log("Fold",allFolds(inputSheet, [folds[0]]))
console.log("Word", drawMatrix(allFolds(inputSheet, folds)))