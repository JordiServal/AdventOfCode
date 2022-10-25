const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n").map(line => {
    line = line.split('')
    line.pop()
    return line.join('')
  })

const parseInput = (input) => {
  const people = {}
  input.forEach((line) => {
    const split =line.split(" ");
    const person = split[0]
    const action = split[2]
    const amount = parseInt(split[3])
    const to = split[10]
    if (!people[person]) people[person] = {};
    people[person][to] = amount * (action === 'gain' ? 1 : -1);
  })
  return people
}

const getTopHappiness = (person, people, seated=[person], happiness = 0) => {
  happiness += people[person][seated[seated.length - 2]] || 0
  const keys = Object.keys(people[person]);
  if (seated.length > keys.length) return happiness + people[seated[0]][person] + people[person][seated[0]]
  
  const topHappiness = keys.reduce((acc, key) => {
    if (seated.includes(key)) return acc
    const happy = getTopHappiness(
      key, 
      people, 
      [...seated, key], 
      happiness + people[person][key] 
    );
    return !acc ? happy : acc > happy ? acc : happy
  }, false);
  
  return topHappiness
}

const addYourself = (people) => {
  const keys = Object.keys(people);
  return {...keys.reduce((acc, key) => {
    return {...acc, [key]: {...people[key], 'You': 0}}
  }, {}), 'You': keys.reduce((acc, key) => {
    return {...acc, [key]: 0}
  }, {})}
}
const people = parseInput(input)

const part1 = getTopHappiness(Object.keys(people)[0], people) 

const peopleWithYou = addYourself(people)

const part2 = getTopHappiness('You', peopleWithYou)

console.log({ part1: part1, part2:  part2 });