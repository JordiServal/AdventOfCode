const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => {
  let [map, orders] = i.split('\n\n')
  map = map.split('\n').map(l => l.split(''))
  orders = orders.replaceAll('\n', '').split('')
  return [map, orders]
}

const parse2 = i => {
  let [map, orders] = i.split('\n\n')
  map = map.replaceAll('#', '##').replaceAll('O', '[]').replaceAll('.', '..').replaceAll('@', '@.').split('\n').map(l => l.split(''))
  orders = orders.replaceAll('\n', '').split('')
  return [map, orders]
}

const DIRECTION = {
  '^': ([x, y]) => [x, y - 1],
  '>': ([x, y]) => [x + 1, y],
  'v': ([x, y]) => [x, y + 1],
  '<': ([x, y]) => [x - 1, y],
}

const move = (pos, order, map) => {
  const posAux = DIRECTION[order](pos)
  if(!map[posAux[1]] || !map[posAux[1]][posAux[0]] || map[posAux[1]][posAux[0]] === '#') return false
  if(map[posAux[1]][posAux[0]] === 'O') {
    const newMap = move(posAux, order, map)
    if(!newMap) return false
    map = newMap
  }
  map[pos[1]][pos[0]] = '.'
  map[posAux[1]][posAux[0]] = 'O'

  return map
}

const followOrders = ([map, orders]) => {
  let x = 0
  let y = map.findIndex(l => {
    x = l.join('').indexOf('@')
    return x !== -1  
  })
  orders.forEach(o => {
    const posAux = DIRECTION[o]([x, y])
    if(map[posAux[1]][posAux[0]] === '#') return
    if(map[posAux[1]][posAux[0]] === 'O') {
      const newMap = move(posAux, o, map)
      if(!newMap) return
      map = newMap
    }
    map[y][x] = '.'
    x = posAux[0]
    y = posAux[1]
    map[y][x] = '@'
  })

  console.log(map.map(l => l.join('')).join('\n'))
  return map.reduce((acc, line, i) => 
    acc + line.reduce((accL, pos, j) => 
      accL = accL + (pos === 'O' ? i * 100 + j : 0)
    , 0)
  , 0)
}


const move2 = (pos, order, map, left) => {
  const posAux = DIRECTION[order](pos)
  const newPos = left ? map[posAux[1]][posAux[0]] : map[posAux[1]][posAux[0] - 1]
  const newPos2 = left ? map[posAux[1]][posAux[0] + 1] : map[posAux[1]][posAux[0]]
  console.log(order + ' - ' + newPos + newPos2 + ' - '+ left + ' - ' +posAux + '\n' + map.map(l => l.join('')).join('\n'))
  if(newPos === '#' || newPos2 === '#') return false
  if(newPos === '[' || newPos === ']' || newPos2 === '[' || newPos2 === ']') {
    let newMap = move2(posAux, order, map, newPos === '[')
    if(newPos2 === '[' && newMap)
      newMap = move2([posAux[0], posAux[1] + 1], order, newMap, true)
    if(!newMap) return false
    map = newMap
  }
  map[pos[1]][pos[0]] = '.'
  map[pos[1]][left ? pos[0] + 1 : pos[0] - 1] = '.'
  if(left){
    map[posAux[1]][posAux[0]] = '['
    map[posAux[1]][posAux[0]+1] = ']'
  } else {
    map[posAux[1]][posAux[0]] = ']'
    map[posAux[1]][posAux[0]-1] = '['
  }

  return map
}

const followOrders2 = ([map, orders]) => {
  let x = 0
  let y = map.findIndex(l => {
    x = l.join('').indexOf('@')
    return x !== -1  
  })

  orders.forEach(o => {
    const posAux = DIRECTION[o]([x, y])
    const newPos = map[posAux[1]][posAux[0]]
    if(newPos === '#') return
    if(newPos === '[' || newPos === ']') {
      const newMap = move2(posAux, o, map, newPos === '[')
      if(!newMap) return
      map = newMap
    }
    map[y][x] = '.'
    x = posAux[0]
    y = posAux[1]
    map[y][x] = '@'
    console.log('\n\n' + map.map(l => l.join('')).join('\n'))
  })

  return map.reduce((acc, line, i) => 
    acc + line.reduce((accL, pos, j) => 
      accL = accL + (pos === '[' ? i * 100 + j : 0)
    , 0)
  , 0)
}


const part1 = followOrders(parse(input))
const part2 = followOrders2(parse2(input))

console.log({part1, part2})