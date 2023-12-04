const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(x => x.trim().split(':'))

const getCardsValue = cards => {
  cards = cards.map(card => card[1].split('|').map(n => n.trim().split(/\s+/).map(Number)))
  return cards.reduce((sum, currentCard) => {
    const winning = currentCard[1].filter(n => currentCard[0].includes(n))
    return winning.length ? sum + Math.pow(2, winning.length-1) : sum
  } ,0)
}

const getCardCopies = cards => {
  cards = cards.map(card => {
    const [wins, currentCard] = card[1].split('|').map(n => n.trim().split(/\s+/).map(Number))
    const winning = currentCard.filter(n => wins.includes(n))
    return {wins: winning.length, cont: 1}
  })
  return cards.reduce((sum, card, index) => {
    for(let i= index + 1; i<index + 1 + card.wins; i++) {
      cards[i].cont += card.cont
    }
    return sum + card.cont
  }, 0)
}

const part1 = getCardsValue(parse(input))
const part2 = getCardCopies(parse(input))

console.log({part1, part2})
