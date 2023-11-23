const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(line => {
  const encryptedName = line.trim().split('-')
  const [sector, checksum] = encryptedName.splice(-1, 1)[0].split('[').map(w => w.replace(']',''))
  
  return {sector: parseInt(sector), checksum, name: encryptedName.join('').split('')}
})

const getRealRooms = rooms => {
  return rooms.map(({name, checksum, sector}) => {
    const letters = name.reduce((acc, prev) => {
      if(!acc[prev]) acc[prev] = {letter: prev, count: 0}
      acc[prev].count += 1
      return acc
    }, {})
    const decodedCheckSum = Object.values(letters).sort((b, a) => a.count > b.count ? 1 : a.count < b.count ? -1 : a.letter < b.letter ? 1 : -1).map(a => a.letter).join('').slice(0, 5)
    return {real: decodedCheckSum === checksum, sector}
  }).filter(room => room.real).map(room => room.sector).reduce((acc, prev) => acc+ prev)
}

console.log('a'.charCodeAt(0), 'z'.charCodeAt(0))


const getDecryptedNames = rooms => {
  return rooms.map(({name, sector}) => {
    const newName = name.map(char => String.fromCharCode(((char.charCodeAt(0) - 97 + sector) % 26) + 97))
    return {newName: newName.join(''), sector}
  }).find(w => w.newName.includes('north'))
}

const part1 = getRealRooms(parse(input))
const part2 = getDecryptedNames(parse(input))

console.log({part1, part2})