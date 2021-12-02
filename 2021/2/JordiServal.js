const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`

const dive = (i) => {
  let x =0,  y = 0, aim = 0
  i.split('\n').forEach(order => {
    const value = parseInt(order.match(/\d+/))
    x += order.includes('forward') ? value : 0
    y += order.includes('down') ? value : order.includes('up') ? -value : 0
  })
  return x*y
}
const dive2 = (i) => {
  let x =0,  y = 0, aim = 0
  i.split('\n').forEach(order => {
    const value = parseInt(order.match(/\d+/))
    aim += order.includes('down') ? parseInt(value) : order.includes('up') ? -parseInt(value) : 0
    if(order.includes('forward')){
      x += parseInt(value)
      y += aim*parseInt(value)
    } 
  })
  return x*y
}

console.log("Result: ", dive(input))
console.log("Result 2: ", dive2(input))