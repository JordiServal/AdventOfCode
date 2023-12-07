const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => {
  return input.split('\n').map(l => {
    l = l.trim().split(/\s+/)
    return {cards: l[0].split(''), bib: parseInt(l[1])}
  })
}

const cardLabel = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

const checkCards = (a, b, i) => a[i] === b[i] ? checkCards(a, b, i+1) : cardLabel.indexOf(b[i]) - cardLabel.indexOf(a[i])

/**
 * Repoker 6
 * Poker 5
 * Full 4
 * Trio 3
 * Dobles Parejas 2
 * Pareja 1
 */
const getTotalWinnings = players => {
  players = players.map(({cards, bib}) => {
    let power = 0
    let hand = cards.reduce((cont, curr, index) => {
      power += (12 - cardLabel.indexOf(curr)) * Math.pow(100, 4-index) 
      if(!cont[curr]) cont[curr] = {value: curr, cont: 1}
      else cont[curr].cont += 1
      return cont
    }, {})
    hand = Object.values(hand).sort((a, b) => b.cont - a.cont)
    if(hand[0].cont === 5) hand = 6
    else if(hand[0].cont === 4) hand = 5
    else if(hand[0].cont === 3 && hand[1].cont === 2) hand = 4 
    else if(hand[0].cont === 3) hand = 3 
    else if(hand[0].cont === 2 && hand[1].cont === 2) hand = 2 
    else if(hand[0].cont === 2) hand = 1 
    else hand = 0
    power += (hand + 1) * Math.pow(100, 5)
    return {cards, bib, hand, power}
  }).sort((a, b) => a.power-b.power)
  return players.reduce((acc, curr, index) => acc + curr.bib * (index + 1), 0)
}

const cardLabel2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']

const getTotalWinningsJoker = (players) => {
  players = players.map(({cards, bib}) => {
    let power = 0
    let hand = cards.reduce((cont, curr, index) => {
      power += (12 - cardLabel2.indexOf(curr)) * Math.pow(100, 4-index) 
      if(!cont[curr]) cont[curr] = {value: curr, cont: 1}
      else cont[curr].cont += 1
      return cont
    }, {})
    let jokers = 0
    if(hand.J) {
      jokers = hand.J.cont
      hand.J.cont = 0
    }
    hand = Object.values(hand).sort((a, b) => b.cont - a.cont)
    hand[0].cont += jokers 

    if(hand[0].cont === 5) hand = 6
    else if(hand[0].cont === 4) hand = 5
    else if(hand[0].cont === 3 && hand[1].cont === 2) hand = 4 
    else if(hand[0].cont === 3) hand = 3 
    else if(hand[0].cont === 2 && hand[1].cont === 2) hand = 2 
    else if(hand[0].cont === 2) hand = 1 
    else hand = 0
    power += (hand + 1) * Math.pow(100, 5)
    return {cards, bib, hand, power}
  }).sort((a, b) => a.power - b.power)
  return players.reduce((acc, curr, index) => acc + curr.bib * (index + 1), 0)
}

const part1 = getTotalWinnings(parse(input))
const part2 = getTotalWinningsJoker(parse(input))
console.log({part1, part2})
