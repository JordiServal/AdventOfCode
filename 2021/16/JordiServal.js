const input = `9C0141080250320F1802104A08`

const hexToBin = (hex) => {
 return (parseInt(hex, 16).toString(2)).padStart(4, '0')
}

const parseInput = (i) => {
  return i.split('').map(l => hexToBin(l)).join('').split('').map(d => parseInt(d))
}

const trans = parseInput(input)

const getLiteralValue = () => {
  let total = []
  let firstByte 
  do {
    let number = trans.splice(0, 5)
    firstByte = number.shift()
    total.push(...number)
  } while(firstByte)
  return parseInt(total.join(''),2)
}

const checkOperator = (id, values) => {
  switch(id){
    case 0:
      return values.reduce((acc, n) => acc + n, 0)
    case 1:
      return values.reduce((acc, n) => acc * n, 1)
    case 2:
      return Math.min(...values)
    case 3:
      return Math.max(...values)
    case 5:
      return values[0] > values[1] ? 1 : 0
    case 6:
      return values[0] < values[1] ? 1 : 0 
    case 7:
      return values[0] === values[1] ? 1 : 0
    }
}

const decrypt = () => {
  let version = parseInt(trans.splice(0, 3).join(''), 2)
  let id = parseInt(trans.splice(0, 3).join(''), 2)
  let values = []
  let value = 0

  if(id === 4) value = getLiteralValue()
  else {
    const lengthType = trans.shift()
    const subPacketCount = lengthType ? parseInt(trans.splice(0, 11).join(''), 2) : parseInt(trans.splice(0, 15).join(''), 2)
    if(lengthType){
      for(let iter = 0; iter < subPacketCount; iter ++) {
        const subPacket = decrypt()
        values.push(subPacket.value)
        version += subPacket.version
      }
    } else {
      const restBytes = trans.length - subPacketCount
      while (trans.length > restBytes) {
        const subPacket = decrypt()
        version += subPacket.version
        values.push(subPacket.value)
      }
    }
    value = checkOperator(id, values)
  }
  return {version, id, value}
}


console.log("Total:", decrypt())