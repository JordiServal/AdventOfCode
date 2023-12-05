const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => {
  input = input.split('\n\n').map(x => x.split('\n').map(l => l.split(/\s+/).map(Number)))
  const seeds = input.shift()[0].filter(Number)
  const orders = input.map(x => x.map(([destination, origin, range], index) => index === 0 ? false : {origin, change: destination - origin, range}).filter(Boolean))
  return {seeds, orders}
}

const getLowestLocation = ({seeds, orders}) => {
  return seeds.map(seed => {
    orders.forEach(order => {
      const range = order.find(({origin, range}) => seed >= origin && seed < origin + range)
      if(range) seed += range.change
    })

    return seed
  }).sort((a,b) => a - b).shift()
}

const getLowestLocationRange = ({seeds, orders}) => {
  let lowest = Infinity
  do {
    const start = seeds.shift()
    const range = seeds.shift()
    for(let i = start; i < start + range; i++) {
      let seed = i
      orders.forEach(order => {
        const range = order.find(({origin, range}) => seed >= origin && seed < origin + range)
        if(range) seed += range.change
      })
      if(seed < lowest) lowest = seed
    }
  } while (seeds.length)
  return lowest
}

const part1 = getLowestLocation(parse(input))
const part2 = getLowestLocationRange(parse(input))
console.log({part1, part2})
