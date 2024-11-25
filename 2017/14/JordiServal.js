const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parseHash= (i) => [...i.split('').map(x => x.codePointAt(0)), 17, 31, 73, 47, 23]

const xor = arr => arr.reduce((a,b) => a ^ b)


const denseHash = (lengths) => {
  const totalLength = 256
  const sequence = Array(totalLength).fill('').map((a, i) => i)
  let skipSize = 0, currentIndex = 0
  for(let x = 0; x < 64; x++) {
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

  return sequence.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk)

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, []).map(chunk => xor(chunk).toString(16).padStart(2,'0')).join("").split("").map(hex => parseInt(hex, 16).toString(2).padStart(4, "0")).join("")
}

const countActiveBits = row => row.reduce((count, char) => char === "1" ? count + 1 : count, 0)
 
const spreadRegion = (disk, x, y, region) => {
  if(!disk[y][x].used || disk[y][x].region !== 0) return disk
  disk[y][x].region = region
  if(y > 0) disk = spreadRegion(disk,x, y-1, region)
  if(y < disk.length - 1) disk = spreadRegion(disk,x, y+1, region)
  if(x < disk[y].length - 1) disk = spreadRegion(disk,x+1, y,region)
  if(x > 0) disk = spreadRegion(disk,x-1,y,region)
  return disk
}

const defrag = key => {
  let count = 0, disk = []
  for(let i = 0; i < 128; i++){
    const hash = denseHash(parseHash(key + "-" + i)).split("")
    count += countActiveBits(hash)
    disk.push(hash.map(x => x === "1" ? {used: true, region: 0} : {used: false}))
  }


  let lastRegion = 0
  for(let y = 0; y < disk.length; y++) {
    for(let x = 0; x < disk[y].length; x++) {
      const cell = disk[y][x]
      if(cell.used){
        if(cell.region === 0) {
          lastRegion += 1
          disk = spreadRegion(disk, x, y, lastRegion)
        }
      }
    }
  }
  return [count, lastRegion]
}

const [part1, part2] = defrag(input)
console.log({part1, part2})       