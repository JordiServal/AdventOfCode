const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

console.log(parseInt(input, 10))

const getDivisors = (num) => {
  const divisors = []
  for(let i = 1; i <= num; i++) {
    if(num % i === 0) divisors.push(i)
  }
  return divisors
}

const countHouses = (input) => {
  let house = 0
  let presents = 0
  do {
    presents = getDivisors(house).reduce((acc, divisor) => acc + divisor * 10, 0)
    house += 1
  } while (presents < input)
  return house - 1
}

const countHouseSkip = (input, skip) => {
  let house = 0
  let presents = 0
  do {
    presents = getDivisors(house).filter(num => num * skip >= house).reduce((acc, divisor) => acc + divisor * 11, 0)
    house += 1
  } while (presents < input)
  return house - 1
}


const part1 = countHouses(parseInt(input, 10))
const part2 = countHouseSkip(parseInt(input, 10), 50)


console.log({ part1, part2 });