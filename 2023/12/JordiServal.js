const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(line => {
  let [record, pattern] = line.trim().split(' ')
  record = record.split('')
  const unknown = record.filter(c => c==='?').length
  const confirm = record.filter(c => c==='#').length
  record = record.map(c => c === '.' ? false : c === '#' ? true : '')
  const total = pattern.split(',').map(Number).reduce((sum, c) => sum + c)
  return {record, unknown, left: total - confirm, pattern}
})

const parseX5 = input => input.split('\n').map(line => {
  let [record, pattern] = line.trim().split(' ')
  record = Array(5).fill(record).join('?')
  record = record.split('')
  const unknown = record.filter(c => c==='?').length
  const confirm = record.filter(c => c==='#').length
  record = record.map(c => c === '.' ? false : c === '#' ? true : '')
  pattern = Array(5).fill(pattern).join(',')
  const total = pattern.split(',').map(Number).reduce((sum, c) => sum + c)
  return {record, unknown, left: total - confirm, pattern}
})

const getSumArrangements = records => {
  let total = 0
  records.forEach(({record, unknown, left, pattern}, index) => {
    const maxBin = parseInt('1'.repeat(left).padEnd(unknown, '0'), 2)
    const minBin = parseInt('1'.repeat(left).padStart(unknown, '0'), 2)
    for(let i = minBin; i <= maxBin; i++) {
      const permutation = i.toString(2).padStart(unknown, '0').split('').map(c => c === '1')
      let resultPattern = []
      let current = 0
      record.forEach(c => {
        if(c === '') c = permutation.shift()
        if(c) current++
        else if (current) {
          resultPattern.push(current)
          current = 0
        }
      })
      if(current) resultPattern.push(current)
      if(resultPattern.join(',') === pattern) {
        total++
        if(total % 5000 === 0) console.log(`Total: ${total}`)
      }
    }
  })
  return total
}

const checkValid = (record, current, left, unknown, sets, pattern) => {
  if(unknown - sets < left - current) return 0
  sets +=1
  const index = record.findIndex(char => char === '')

  let count = 0
  if(index === -1) {
    if(current !== left) return 0
    let resultPattern = []
    let actual = 0
    record.forEach(c => {
      if(c) actual++
      else if (actual) {
        resultPattern.push(actual)
        actual = 0
      }
    })
    if(actual) resultPattern.push(actual)
    if(resultPattern.join(',') === pattern) {
      return 1
    }
    return 0
  } else {
    if(current !== left) {
      record[index] = true
      count += checkValid([...record], current + 1, left, unknown, sets, pattern)
    }
    record[index] = false

    count += checkValid([...record], current, left, unknown, sets, pattern)
  }

  return count
}

const getSumRecurs = records => {
  return records.reduce((sum, {record, unknown, left, pattern}, index) => { 
    console.log(index, pattern)
    return sum + checkValid(record, 0, left, unknown, 0, pattern)
  }, 0)
}

const start = Date.now()

const part1 = getSumRecurs(parse(input))
// const part1 = getSumArrangements(parse(input))

const mid = Date.now()

console.log("Part 2")

const part2 = getSumRecurs(parseX5(input))
// const part2 = '' // getSumArrangements(parseX5(input))

const end = Date.now()

console.log({part1, part2})
console.log(`Execution time: Part 1 -> ${(mid-start)/1000}s, Part 2 -> ${(end-mid) / 1000}s`)
