const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(x => x.trim().split(':'))

const getPossibleGames = (games, condition) => {
  return games.map(([id, rounds]) => {
    const game = {}
    game.id = parseInt(id.split(' ')[1])
    game.dices = !rounds.split(';').map(round => {
      return round.split(',').reduce((acc, curr) => {
        const [cont, color] = curr.trim().split(' ')
        return {...acc, [color]: parseInt(cont)}
      }, {})
    }).some(round => {
      if(round.red && round.red > condition.red) return true
      if(round.green && round.green > condition.green) return true
      if(round.blue && round.blue > condition.blue) return true
      return false
    })
    return game
  }).reduce((acc, curr) => curr.dices ? acc + curr.id: acc, 0)
}

const getPowerGames = games => {
  return games.map(([id, rounds]) => {
    const game = {}
    game.id = parseInt(id.split(' ')[1])
    game.dices = !rounds.split(';').map(round => {
      return round.split(',').reduce((acc, curr) => {
        const [cont, color] = curr.trim().split(' ')
        return {...acc, [color]: parseInt(cont)}
      }, {})
    }).some(round => {
      if(round.red && round.red > condition.red) return true
      if(round.green && round.green > condition.green) return true
      if(round.blue && round.blue > condition.blue) return true
      return false
    })
    return game
  })
}

const condition = {
  red: 12,
  green: 13,
  blue: 14
}

const part1 = getPossibleGames(parse(input), condition)
const part2 = getPowerGames(parse(input))


console.log({part1, part2})
