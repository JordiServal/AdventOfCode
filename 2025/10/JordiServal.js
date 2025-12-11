const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('\n').map((l, i) => {
  let [lights, buttons, joltage] = l.replaceAll(/\[|\}/g, '').split(/] \(|\) {/g)
  lights = lights.split('').map(x => x === '.')
  buttons = buttons.split(') (').map(x => x.split(',').map(Number))
  console.log(`Machine ${i} - Lights: ${lights.length}, Buttons: ${buttons.length}`)
  joltage = joltage.split(',').map(Number)
  return {lights, buttons, joltage}
})

function* permutations(indices) {
  const n = indices.length;
  yield indices;
  
  while (true) {
    let i = n - 2;
    while (i >= 0 && indices[i] >= indices[i + 1]) i--;
    
    if (i < 0) break;
    
    let j = n - 1;
    while (indices[j] <= indices[i]) j--;
    
    [indices[i], indices[j]] = [indices[j], indices[i]];
    
    // Invertir la parte desde i+1 hasta el final
    let left = i + 1;
    let right = n - 1;
    while (left < right) {
      [indices[left], indices[right]] = [indices[right], indices[left]];
      left++;
      right--;
    }
    
    yield indices;
  }
}

const countButtonPresses = (machines) => {
  return machines.reduce((pressCount, {lights, buttons}, index) => {
    let minPresses = Infinity
    const buttonIndices = buttons.map((_, i) => i)
    
    for(let sequence of permutations(buttonIndices)) {
      let presses = 0
      const auxLight = [...lights]
      
      for(let pressB of sequence) {
        const but = buttons[pressB]
        presses ++
        but.forEach(n => auxLight[n] = !auxLight[n])
        if(auxLight.every(l => l === true)) {
          minPresses = Math.min(minPresses, presses)
          break
        }
      }
    }
    console.log(`Machine ${index}: ${minPresses} presses`)
    return pressCount + minPresses
  }, 0);
}

const time = Date.now()
const part1 = countButtonPresses(parse(input))
const time2 = Date.now()
console.log(`Part 1 Time: ${time2 - time}ms`)
const part2 = '' // parse(input)
console.log({part1, part2})