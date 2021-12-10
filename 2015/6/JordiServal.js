const input = `toggle 461,550 through 564,900
turn off 370,39 through 425,839
turn off 464,858 through 833,915
turn off 812,389 through 865,874`

const getLights = (input) => {
  const lights = Array(1000).fill().map(() => Array(1000).fill(false))
  input.forEach(order => {
    let [coord1, word, coord2] = order.split(' ').splice(-3, 3)
    const [x1, y1] = coord1.split(',').map(Number)
    const [x2, y2] = coord2.split(',').map(Number)
    for(let x = x1; x <= x2; ++x) {
      for(let y = y1; y <= y2; ++y) {
        lights[y][x] = order.includes('on') ? true : order.includes('off') ? false : !lights[y][x]
      }
    }
  })
  return lights.reduce((acc, line) => acc + line.reduce((accL, light) => accL + (light ? 1:0) , 0), 0)
}
const getElvishLights = (input) => {
  const lights = Array(1000).fill().map(() => Array(1000).fill(0))
  input.forEach(order => {
    let [coord1, word, coord2] = order.split(' ').splice(-3, 3)
    const [x1, y1] = coord1.split(',').map(Number)
    const [x2, y2] = coord2.split(',').map(Number)
    for(let x = x1; x <= x2; ++x) {
      for(let y = y1; y <= y2; ++y) {
        lights[y][x] += order.includes('on') ? 1 : order.includes('off') ? -1 : 2
        if(lights[y][x] === -1) lights[y][x] = 0
      }
    }
  })
  return lights.reduce((acc, line) => acc + line.reduce((accL, light) => accL + light, 0), 0)
}

console.log("Lit lights: ", getLights(input.split('\n')))
console.log("Elvish lights: ", getElvishLights(input.split('\n')))