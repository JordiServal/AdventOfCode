const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => i.split('').map(Number)

const fragmentedDisk = diskMap => {
  let index = 0, disk = []
  diskMap.forEach((num, i) => {
    const space = Array(num).fill(i % 2 === 0 ? index : null)
    disk = [...disk, ...space]
    index += i % 2 === 0 ? 1 : 0
  });

  for(let i = 0; i < disk.length; i++) {
    const current = disk[i]
    if(current === null) {
      const last = disk.findLastIndex(e => e !== null)
      if(last > i) {
        disk[i] = disk[last]
        disk[last] = null
      }
    }
  }

  return disk.filter(x => x !== null).reduce((acc, curr, i) => acc + curr * i, 0)
}

const defragmentedDisk = diskMap => {
  let index = 0, disk = []
  diskMap.forEach((num, i) => {
    const space = Array(num).fill(i % 2 === 0 ? index : null)
    disk = [...disk, ...space]
    index += i % 2 === 0 ? 1 : 0
  });

  for(let i = index - 1; i > 0; i--) {
    const fileSize = disk.filter(c => c === i).length, firstSpace = disk.indexOf(null)
    let space = 0, indexSpace = 0
    if(disk.indexOf(i) > firstSpace) {
      for(let s = firstSpace; s < disk.length; s++) {
        if(disk[s] === null) {
          space++ 
          if(indexSpace === 0) indexSpace = s
        } else {
          if(fileSize <= space) {
            // Fit file
            disk.splice(disk.indexOf(i), fileSize, ...Array(fileSize).fill(null))
            disk.splice(indexSpace, fileSize, ...Array(fileSize).fill(i))
            break;
          }
          space = 0
          indexSpace = 0
          if(disk[s] === i) break
        }
      }
    }
  }

  return disk.reduce((acc, curr, i) => acc + curr * i, 0)
}

console.time('p1')
const part1 = fragmentedDisk(parse(input))
console.timeEnd('p1')
console.time('p2')
const part2 = defragmentedDisk(parse(input))
console.timeEnd('p2')

console.log({part1, part2})