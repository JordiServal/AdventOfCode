const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`

const parseInput = (i) => {
  let [word, table] = i.split('\n\n')
  word = word.split('')
  table = table.split('\n').reduce((values, line) => {
    const [key, value] = line.split(' -> ')
    values[key] = value
    return values
  }, {})
  return [word, table]
}

const countPairs = (w, t) => {
  const cont = {}
  Object.keys(t).forEach(pair => cont[pair] = 0)
  const r = [...w].reduce((prev, curr) => {
    const pair = `${prev}${curr}`
    cont[pair]++
    return curr
  })
  return cont 
}

const collect = (w, t, s) => {
  // Number of pairs in word
  const cont = countPairs(w, t)
  // Count initial letters
  let letters = w.reduce((counter, letter) => {
    if(!counter[letter]) counter[letter] = 0
    counter[letter]++
    return counter
  }, {})
  // Iteration per step
  for(let step = 0; step < s; step++) {
    // Copy cont for this iter
    const contAux = {...cont}
    Object.keys(cont).forEach(pair => {
      // Avoid empty pairs
      if(contAux[pair]) {
        
        cont[pair] -= contAux[pair]
        const letter = t[pair]
        if(!letters[letter]) letters[letter] = 0
        letters[letter] += contAux[pair]
        let [nPair1, nPair2] = pair.split('')
        cont[nPair1+letter] += contAux[pair]
        cont[letter+nPair2] += contAux[pair]
      }
    })
  }
  letters = Object.values(letters)
  return Math.max(...letters) - Math.min(...letters)
}

const [word, table] = parseInput(input)

const steps = 40

console.log("Word", collect(word, table, steps))
