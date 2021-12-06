const input = `3,4,3,1,2`

const countLanternFish = (fishes, days) => {
  let counter = Array(9).fill(0)
  fishes.forEach(fish => counter[parseInt(fish)] ++)
  for(let day = 1; day <= days; day++) {
    const newFishes = counter.shift()
    counter[6] += newFishes
    counter.push(newFishes)
  }
  return counter.reduce((acc, v) => acc+v)
}

console.log(`After 80 there are: `, countLanternFish(input.split(',').map(i => parseInt(i)), 80))
console.log(`After 256 there are: `, countLanternFish(input.split(',').map(i => parseInt(i)), 256))