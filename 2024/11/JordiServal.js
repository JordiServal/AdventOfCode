const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split(/\s+/)

// BRUTE FORCE
// const blinkStones = (stones, blinks) => {
//   for(let b = 0; b < blinks; b++) {
//     stones = stones.reduce((total, stone) => {
//       if(stone === '0') return [...total, '1']
//       if(stone.length % 2 === 0) return [...total, stone.slice(0, stone.length/2), parseInt(stone.slice(stone.length/2, stone.length)).toString()]
//       return [...total, (parseInt(stone) * 2024).toString()]
//     }, [])
//     console.log('Blink', b, 'completed:', stones.length)
//   }
//   return stones.length
// }

const blinkStones = (stones, blinks) => {
  let stoneTypes = {}
  stones.forEach(s => {
    stoneTypes[s] = (stoneTypes[s] || 0) + 1
  })
  for(let b = 0; b < blinks; b++) {
    const newStones = {}
    Object.entries(stoneTypes).forEach(([stone, count]) => {
      if(stone === '0') newStones['1'] = (newStones['1'] || 0) + count
      else if(stone.length % 2 === 0) {
        const p1 = stone.slice(0, stone.length/2)
        const p2 = parseInt(stone.slice(stone.length/2, stone.length)).toString()
        newStones[p1] = (newStones[p1] || 0) + count
        newStones[p2] = (newStones[p2] || 0) + count
      } else {
        newStones[(parseInt(stone) * 2024).toString()] = (newStones[(parseInt(stone) * 2024).toString()] || 0) +count
      }
    }, [])
    stoneTypes = newStones
  }
  return Object.values(stoneTypes).reduce((sum, c) => sum + c, 0)
}

const part1 = blinkStones(parse(input), 25)
const part2 = blinkStones(parse(input), 75)
console.log({part1, part2})