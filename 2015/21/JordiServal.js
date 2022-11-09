const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n").map(line => line.trim())

const parseInput = (input) => {
  return input.map(line => {
    return line.split(': ').map(Number)[1]
  })
}

const weapons = [
  ["Dagger",        8,     4,       0],
  ["Shortsword",   10,     5,       0],
  ["Warhammer",    25,     6,       0],
  ["Longsword",    40,     7,       0],
  ["Greataxe",     74,     8,       0]
]

const armors = [
  ["None",   0,     0,       0],
  ["Leather",      13,     0,       1],
  ["Chainmail",    31,     0,       2],
  ["Splintmail",   53,     0,       3],
  ["Bandedmail",   75,     0,       4],
  ["Platemail",   102,     0,       5],
]

const rings = [
  ["None",   0,     0,       0],
  ["Damage +1",    25,     1,       0],
  ["Damage +2",    50,     2,       0],
  ["Damage +3",   100,     3,       0],
  ["Defense +1",   20,     0,       1],
  ["Defense +2",   40,     0,       2],
  ["Defense +3",   80,     0,       3],
]

const battle = (atk, def) => (atk - def) < 1 ? 1 : atk - def

const rpg = (player, boss) => {
  while (true) {
    boss[0] -= battle(player[1], boss[2])
    if(boss[0] <= 0) return true
    player[0] -= battle(boss[1], player[2])
    if(player[0] <= 0) return false
  }
}

const createPlayer = (weapon, armor, ring1, ring2) => {
  return [100, 
    weapon[2] + armor[2] + ring1[2] + ring2[2], 
    weapon[3] + armor[3] + ring1[3] + ring2[3],
    weapon[1] + armor[1] + ring1[1] + ring2[1],
    weapon[0] + " - " + armor[0] + " - " + ring1[0] + " - " + ring2[0],
  ]
}

const checkCosts = (boss) => {
  let lowest = false
  let highest = 0
  weapons.forEach((weapon) => {
    armors.forEach((armor) => {
      rings.forEach((ring1) => {
        rings.forEach((ring2) => {
          if(ring1[0] === ring2[0] && ring1[3] !== 0) 
            return
          const player = createPlayer(weapon, armor, ring1, ring2)
          const win = rpg(player, [...boss])
          if(win){

            if(!lowest || player[3] < lowest[3])
            lowest = player
          } else 
            if(!highest || player[3] > highest[3])
              highest = player
        })
      })
    })
  })
  return [lowest, highest]
}

const [part1, part2] = checkCosts(parseInput(input))

console.log({ part1, part2 });