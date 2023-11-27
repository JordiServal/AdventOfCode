const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.trim().split('\n').map(order => order.split(' '))

const execOrders = orders => {
  const newBots = {}
  while(orders.length) {
    orders = orders.map(order => {
      if(order[0] === 'value') {
        const botName = `${order[4]}-${order[5]}`
        if(!newBots[botName]) newBots[botName] = []
        newBots[botName] = [...newBots[botName], parseInt(order[1])].sort((a,b) => a - b)
        return false
      } else {
        const botName = `${order[0]}-${order[1]}`
        if(newBots[botName] && newBots[botName].length === 2) {
          const highName = `${order[10]}-${order[11]}`
          const lowName = `${order[5]}-${order[6]}`
          if(!newBots[highName]) newBots[highName] = []
          if(!newBots[lowName]) newBots[lowName] = []
          if(newBots[botName][0] === 17 && newBots[botName][1] === 61) console.log(botName)
          newBots[highName] = [...newBots[highName], newBots[botName][1]].sort((a,b) => a - b)
          newBots[lowName] = [...newBots[lowName], newBots[botName][0]].sort((a,b) => a - b)
          newBots[botName] = []
          return false
        } else {
          return order
        }
      }
    }).filter(Boolean)
  }
  return newBots['output-0'][0] * newBots['output-1'][0] * newBots['output-2'][0]
}

const part1 = execOrders(parse(input))
const part2 = ''

console.log({part1, part2})
