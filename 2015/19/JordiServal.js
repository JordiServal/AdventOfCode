const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")

const parseInput = (input) => {
  const molecule = input.pop().trim().split('')
  input.pop()
  const replacements = input.reduce((total, line) => {
    const [from, to] = line.trim().split(' => ')
    if(!total[from]) total[from] = []
    total[from].push(to)
    return total
  }, {})
  return { molecule, replacements }
}

const replaceMolecules = (key, molecule, replacements, index) => {
  const newMolecules = []
  if(replacements[key]) {
    replacements[key].forEach((replace) => {
      const newMolecule = [...molecule]
      newMolecule[index] = replace
      if(key.length === 2) newMolecule[index + 1] = ''
      newMolecules.push(newMolecule.join(''))
    })
  }
  return newMolecules
}

const countReplaces = ({ molecule, replacements }) => {
  const replaces = molecule.reduce((replaces, char, index) => {
    replaces = [ ...replaces, ...replaceMolecules(char, molecule, replacements, index) ]
    if(index + 1 < molecule.length) {
      replaces = [ ...replaces, ...replaceMolecules(char + molecule[index + 1], molecule, replacements, index) ]
    }
    return replaces
  }, [])
  return {count: replaces.length, countRep: Object.keys(replaces.reduce((total, replace) => {return { ...total, [replace]: true }}, {})).length}
}

const parsed = parseInput(input)
console.log("🚀 ~ file: JordiServal.js ~ line 34 ~ parsed", parsed)

const part1 = countReplaces(parsed)
const part2 = ""


console.log({ part1, part2 });