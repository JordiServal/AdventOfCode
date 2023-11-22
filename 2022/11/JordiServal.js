const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString().replace(/\r/g, "")
  .split("\n\n").map(x => x.split('\n').map(y => y.trim().split(' ')))

const OPS = {
  '*' : ([a, b], old) => (isNaN(a) ? old : a) * (isNaN(b) ? old : b),
  '+' : ([a, b], old) => (isNaN(a) ? old : a) + (isNaN(b) ? old : b)
}

const mcd = (a, b) => a ? mcd(b % a, a) : b
const mcm = (a, b) => a * b / mcd(a, b)

const parseInput = (input) => {
  return input.map(x => {
    return {
      items: x[1].splice(2).map(n => parseInt(n.replace(',', ''))),
      op: OPS[x[2][x[2].length-2]],
      values: [parseInt(x[2][x[2].length-3]), parseInt(x[2][x[2].length-1])],
      test: parseInt(x[3][x[3].length-1]),
      true: parseInt(x[4][x[4].length-1]),
      false: parseInt(x[5][x[5].length-1]),
      activity: 0
    }
  })
}

const getMostActive = (monkeys, steps) => {
  for(let i = 0; i < steps; i++) {
    monkeys = monkeys.map((m) => {
      m.activity += m.items.length
      m.items.forEach(item => {
        item = Math.floor(m.op(m.values, item) / 3)
        const destiny = item % m.test === 0 ? m.true : m.false
        monkeys[destiny].items.push(item)
      })
      m.items = []
      return m
    })
  }
  return monkeys.map(m => m.activity).sort((a, b) => b - a).splice(0, 2).reduce((a, b) => a * b)
}

const getMostActiveWorry = (monkeys, steps) => {
  const manageWorry = monkeys.map(m => m.test).reduce(mcm)
  for(let i = 0; i < steps; i++) {
    monkeys = monkeys.map((m) => {
      m.activity += m.items.length
      m.items.forEach(item => {
        item = m.op(m.values, item) % manageWorry
        const destiny = item % m.test === 0 ? m.true : m.false
        // if(item % m.test === 0) item = m.test
        monkeys[destiny].items.push(item)
      })
      m.items = []
      return m
    })
  }
  return monkeys.map(m => m.activity).sort((a, b) => b - a).splice(0, 2).reduce((a, b) => a * b)
}
let monkeysInput = parseInput(JSON.parse(JSON.stringify(input)))
const part1 = getMostActive([...monkeysInput], 20)
monkeysInput = parseInput(JSON.parse(JSON.stringify(input)))
const part2 = getMostActiveWorry([...monkeysInput], 10000)

console.log({part1, part2})