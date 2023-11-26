const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.trim().split('')

const decompressFile = file => {
  let decompressed = [], firstMarker = 0
  do {
    firstMarker = file.indexOf('(')
    if(firstMarker === -1) {
      decompressed.push(...file)
    } else {
      decompressed.push(...file.splice(0, firstMarker))
      const secondMarker = file.indexOf(')')
      const marker = file.splice(0, secondMarker + 1).join('').replace(/\(|\)/, '').split('x')
      const substring = file.splice(0, parseInt(marker[0]))
      decompressed.push(...Array(parseInt(marker[1])).fill(substring.join('')).join('').split(''))
    }
  } while(firstMarker !== -1)
  return {decompressed, length: decompressed.length}
}

const decompressTotalFile = file => {
  // let fileParse = file.split(/\(|\)/).map((str, i) => i % 2 === 0 ? {marker: false, lgh: str.length} : {marker: true, lgh: str.length + 2, long: parseInt(str.split('x')[0]), multiply: parseInt(str.split('x')[1])}).filter(x => x.lgh !== 0)
  // do{
  //   let decomp = []
  //   do {
  //     const current = fileParse.shift()
  //     if(!current.marker) {
  //       decomp.push(current)
  //     } else {
  //       let long = current.long, defit = undefined, next = {}
  //       const decompMarker = []
  //       while (long > 0) {
  //         next = fileParse.shift()
  //         if(next.lgh <= long) {
  //           decompMarker.push(next)
  //           long -= next.lgh
  //         } else {
  //           decompMarker.push(
  //             {marker: false, lgh: long}
  //           )
  //           defit = {marker: false, lgh: next.lgh - long}
  //           long = 0
  //         }
  //       }
  //       for(let j=0; j<current.multiply; j++) {
  //         decomp.push(...decompMarker)
  //       }
  //       if(defit) decomp.push(defit)
  //     }
  //   } while(fileParse.length)
  //   fileParse = decomp
  // } while(fileParse.some(x => x.marker))
  // return fileParse.reduce((acc, cur) => acc + cur.lgh, 0)
}

const part1 = decompressFile(parse(input))
const part2 = decompressTotalFile(input.trim())
console.log({part1, part2})
