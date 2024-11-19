const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => i.split('\n').reduce((tree, r) => {
  const [nameWeight, above] = r.split(' -> ')
  const [name, weight] = nameWeight.split(' ')
  tree[name] = {name, weight: parseInt(weight.replace(/\(|\)/, '')), above: above?.split(', '), bottom: undefined}
  return tree
}, {}) 

const arrangeTree = (tree) => {
  Object.values(tree).forEach((program) => {
    program.above?.forEach((child) => {
      tree[child].bottom = program.name
    })
  }) 
  return tree
}

const checkBottom = (tree) => {
  return Object.values(tree).find(program => program.bottom === undefined).name
}

const weightChilds = (tree, program) => {
  const childs = []
  const weightAbove = tree[program].above !== undefined ? tree[program].above.reduce((weights, p) =>{
    const weighChild = weightChilds(tree, p)
    childs.push(weighChild)
    return weights + weighChild
  }, tree[program].weight) : tree[program].weight
  if((childs.length !== 0 && !childs.every(p => p === childs[0]) || program === 'arqoys'))
    console.log(program, tree[program], childs, '+++++++++++++++++++++++')
  return weightAbove
}

const checkWeights = (tree, bottom) => {
  tree[bottom].above.forEach(child => {
    weightChilds(tree, child)
  })
}

const part1 = checkBottom(arrangeTree(parse(input)))
const part2 = checkWeights(arrangeTree(parse(input)), part1)

console.log({part1, part2})