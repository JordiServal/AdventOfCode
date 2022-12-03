const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.join(__dirname, "inputManu.txt"), "utf8")
  .trim()
  .split('\n')

function transformNumberOfLetter (letter) {
  const charCode = letter.charCodeAt()
  return charCode < 97 ? charCode - 38 : charCode - 96
}
function getCompartiments (line) {
  const first = line.substring(0, line.length / 2)
  const second = line.substring(line.length / 2, line.length)
  return [first, second]
}

// PART1
const part1 = input.reduce((total, line) => {
  const [firstCompartiment, secondCompartiment] = getCompartiments(line)
  
  const repeatedArticles = firstCompartiment.split('').reduce((letters, letterFirst) => {
    const letterExist = secondCompartiment.includes(letterFirst)
    if(letterExist){
      return {
        ...letters,
        [letterFirst]: transformNumberOfLetter(letterFirst)
      }
    }
    return letters
  }, {})
  
  return total + Object.values(repeatedArticles).reduce((a, b) => a + b, 0)
}, 0)





// PART2
const groups = input.reduce((acc, line, index) => {
  const isGroup = index % 3 === 0
  if(!isGroup) {
    acc[acc.length - 1].push(line)
    return acc
  }
  return [...acc, [line]]
}, [])

const part2 = groups.reduce((total, group) => {
  const repeatedLetter = group[0].split('').filter((letter) => {
    /* console.log(group.every((line) => line.includes(letter))) */
    return group.every((line) => line.includes(letter))
  }) 
  
  return total + transformNumberOfLetter(repeatedLetter[0])
}, 0)

console.log(part1)
console.log(part2)
