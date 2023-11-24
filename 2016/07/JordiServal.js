const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n').map(line => line.split(/\[|\]/).map(w => w.split('')))

const checkTLS = ips => {
  return ips.map(ip => {
    let tlsSup = false, hypernet = false
    const tlss = ip.map((subip, index) => {
      return subip.some((c, i) => {
        if(i > subip.length - 4) return false
        if(c === subip[i+1]) return false
        if(c + subip[i+1] !== subip[i+3] + subip[i+2]) return false
        if(index % 2) hypernet = true
        else tlsSup = true
        return true
      });
    })
    return tlsSup && !hypernet
  }).filter(Boolean).length
}

const checkSSL = ips => {
  return ips.map(ip => {
    const abas = ip.map(subip => {
      const aba = []
      subip.forEach((c, i) => {
        if(i > subip.length - 3) return false
        if(c === subip[i+1]) return false
        if(c !== subip[i+2]) return false
        aba.push(c+subip[i+1]+c)
      });
      return aba
    })
    return abas.some((aba, index) => {
      if(index > abas.length-2) return false
      return aba.some(subaba => abas[index+1].includes(subaba[1]+subaba[0]+subaba[1]))
    })
  }).filter(Boolean).length
}

const part1 = checkTLS(parse(input))
const part2 = checkSSL(parse(input))
console.log({part1, part2})