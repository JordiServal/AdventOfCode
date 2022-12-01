const data = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")

let result = data.reduce((acc, val) => {
  if (val !== '') {
    acc[acc.length - 1] += +val
  } else {
    acc.push(+val)
  }
  return acc
}, [0])

result = result.sort((a, b) => a - b)
console.log(`Part 1: ${result.at(-1)}`)
console.log(`Part 2: ${result.at(-1) + result.at(-2) + result.at(-3)}`)
