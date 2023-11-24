const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(line => line.split(' '))

const rect = (scr, [wide, tall]) => {
  for(let i=0; i < tall; i++) {
    for(let j=0; j < wide; j++) {
      scr[i][j] = '#'
    }
  }
  return scr
} 
const column = (scr, i, long) => {
  let col = scr.map(r => r[i])
  const poped = col.splice(-long)
  col = [...poped, ...col]
  return scr.map((r, index) => {
    r[i] = col[index]
    return r
  })
}

const row = (scr, i, long) => {
  const poped = scr[i].splice(-long)
  scr[i] = [...poped, ...scr[i]]
  return scr
}

const orders = {
  rect,
  column,
  row,
}

const execOperations = (operations, [wide, tall]) => {
  let screen = []
  for (let i = 0; i < tall; i++) {
    screen.push([]);
    for (let j = 0; j < wide; j++) {
      screen[i].push('.')
    }
  }
  operations.forEach(op => {
    if(op[0] === 'rect') screen = rect(screen, op[1].split('x').map(Number))
    else {
      screen = orders[op[1]](screen, parseInt(op[2].split('=')[1]), parseInt(op[4]))
    }
  });
  console.log(screen.map(row => row.join('')).join('\n'))
  return screen.reduce((cont, r) => cont + r.filter((c) => c === '#').length, 0)
}

const part1 = execOperations(parse(input), [50, 6])
const part2 = ''
console.log({part1, part2})

