const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\r\n\r\n').map(machine => {
  machine = machine.split('\r\n')
  // Prizes 
  const prize = machine.pop().replaceAll(/Prize: |X=|,|Y=/g, '').split(' ').map(Number)
  const [bA, bB] = machine.map(button => button.replaceAll(/Button |A|B|: X+| Y/g, '').split(',').map(Number))
  return {A: [bA[0], bA[1]], B: [bB[0], bB[1]], prize}
})

// Brute force
// const checkTokens = ({A, B, prize}, pA, pB) => {
  //   console.log(A, B, prize, pA, pB)
  //   if(pA >= 100 || pB >= 100 || (pA * A[0] + pB * B[0]) > prize[0] || (pA * A[1] + pB * B[1]) > prize[1]) return -1
  //   if((pA * A[0] + pB * B[0]) === prize[0] || (pA * A[1] + pB * B[1]) === prize[1]) return pA * 3 + pB
  //   const pushA = checkTokens({A, B, prize}, pA + 1, pB)
  //   const pushB = checkTokens({A, B, prize}, pA, pB + 1)
  //   console.log({pushA, pushB})
  //   return pushA === -1 ? pushB : pushB === -1 ? pushA : pushA < pushB ? pushA : pushB
// }
const checkTokens = ({A, B, prize}) => {
  const PA = (A[1] * prize[0] - A[0] * prize[1]) / (A[1] * B[0] - A[0] * B[1])
  const PB = (prize[0] - PA * B[0]) / A[0]
  if(PA % Math.floor(PA) !== 0 || PB % Math.floor(PB) !== 0) return false
  // if((PA * A[1] + PB * B[1]) !== prize[1]) return false
  return PB * 3 + PA
}

const getPrizes = (machines, sum) => {
  return machines.reduce((total, mach) => {
    mach.prize = mach.prize.map(x => x + sum)
    const tokens = checkTokens(mach, 0, 0)
    return !tokens ? total : tokens + total
  }, 0);
}

const part1 = getPrizes(parse(input), 0)
const part2 = getPrizes(parse(input), 10000000000000)

console.log({part1, part2})