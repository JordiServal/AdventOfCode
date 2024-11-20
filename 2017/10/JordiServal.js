const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => i.split(',').map(Number)
const parse2 = (i) => [...i.split('').map(x => x.codePointAt(0)), 17, 31, 73, 47, 23]
const xor = arr => arr.reduce((a,b) => a ^ b)

const knotHash = (lengths) => {
  const totalLength = 256
  const sequence = Array(totalLength).fill('').map((a, i) => i)
  let skipSize = 0, currentIndex = 0
  lengths.forEach(len => {
    const slice = sequence.splice(0, currentIndex)
    sequence.push(...slice)

    const reversed = sequence.splice(0, len).reverse()
    sequence.unshift(...reversed)

    const returnedSlice = sequence.splice(sequence.length - currentIndex, sequence.length)
    sequence.unshift(...returnedSlice)

    currentIndex = (currentIndex + len + skipSize) % totalLength
    skipSize ++
  });
  return sequence[0] * sequence[1]
}

const denseHash = (lengths) => {
  const totalLength = 256
  const sequence = Array(totalLength).fill('').map((a, i) => i)
  let skipSize = 0, currentIndex = 0
  for(let x = 0; x < 60; x++) {
    lengths.forEach(len => {
      const slice = sequence.splice(0, currentIndex)
      sequence.push(...slice)

      const reversed = sequence.splice(0, len).reverse()
      sequence.unshift(...reversed)

      const returnedSlice = sequence.splice(sequence.length - currentIndex, sequence.length)
      sequence.unshift(...returnedSlice)

      currentIndex = (currentIndex + len + skipSize) % totalLength
      skipSize ++
    });
  }
  const perChunk = 16 // items per chunk    

  const result = sequence.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk)

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, []).map(chunk => xor(chunk).toString(16)).join('')
  console.log(result)
}

const part1 = knotHash(parse(input))
const part2 = denseHash(parse2(input))

console.log({part1, part2})