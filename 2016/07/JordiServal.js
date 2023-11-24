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
    const abaip = []
    const abahyper = []
    ip.forEach((subip, index) => {
      subip.forEach((c, i) => {
        if(c === subip[i+1]) return false
        if(c !== subip[i+2]) return false
        if(index % 2)
          abahyper.push(c+subip[i+1]+c)
        else
          abaip.push(c+subip[i+1]+c)
      });
    })
    return abaip.some((aba) => {
      return abahyper.includes(aba[1]+aba[0]+aba[1])
    })
  }).filter(Boolean).length
}

const part1 = checkTLS(parse(input))
const part2 = checkSSL(parse(input))
console.log({part1, part2})