const input = ``.split(',').map(e => parseInt(e))

const getTotalFuel = (i) => {
  const max = Math.max(...i)
  const min = Math.min(...i)
  console.log(max, min)
  let minFuel
  for(let num = min; num < max; num++) {
    const fuel = i.reduce((acc, v) => acc + Math.abs(v - num) , 0)
    minFuel = !minFuel || fuel < minFuel ? fuel : minFuel 
  }
  return minFuel
}
const getTotalCrabFuel = (i) => {
  const max = Math.max(...i)
  const min = Math.min(...i)
  console.log(max, min)
  let minFuel
  for(let num = min; num < max; num++) {
    // seq sum = n*(n+1)/2
    const fuel = i.reduce((acc, v) => acc + (Math.abs(v - num)*(Math.abs(v - num)+1)/2) , 0)
    minFuel = !minFuel || fuel < minFuel ? fuel : minFuel 
  }
  return minFuel
}

console.log(getTotalFuel(input))
console.log(getTotalCrabFuel(input))