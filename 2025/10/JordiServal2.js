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
  joltage = joltage.split(',').map(Number)
  return {lights, buttons, joltage}
})

const pressButtons = (lights, buttons, presses, minPresses) => {
  if(presses >= minPresses || minPresses === 1) return minPresses
  if(lights.every(l => l === true)) return presses
  
  for(let b of buttons) {
    const newLights = [...lights]
    b.forEach(n => newLights[n] = !newLights[n])
    const result = pressButtons(newLights, buttons.filter(x => x !== b), presses + 1, minPresses)
    if(result < minPresses) minPresses = result
    if(presses >= minPresses + 1) return minPresses

  }
  return minPresses
}

const countButtonPresses = (machines) => {
  return machines.reduce((pressCount, {lights, buttons}, index) => {
    let minPresses = pressButtons(lights, buttons, 0, Infinity)
    console.log(`Machine ${index} - Minimum Presses: ${minPresses}`)
    return pressCount + minPresses
  }, 0);
}

const time = Date.now()
const part1 = countButtonPresses(parse(input))
const time2 = Date.now()
console.log(`Part 1 Time: ${time2 - time}ms`)
const part2 = '' //parse(input)
console.log({part1, part2})