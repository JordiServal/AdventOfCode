const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = i => {
  let [rules, pages] = i.split('\r\n\r\n')
  rules = rules.split('\n').map(r => r.split('|').map(Number))
  pages = pages.split('\n').map(l => l.split(',').map(Number))
  return {rules, pages}
}

const checkPage = (page, rules) => {
  rules = rules.filter(r => page.includes(r[0]) && page.includes(r[1]))
  const comp = rules.some(r => page.indexOf(r[0]) > page.indexOf(r[1]))
  return comp ? 0 : page[Math.floor(page.length / 2)]
}

const checkWrongPage = (page, rules) => {
  rules = rules.filter(r => page.includes(r[0]) && page.includes(r[1]))
  let comp = false
  for(let x = 0; x<rules.length; x++) {
    const r = rules[x]
    const i1 = page.indexOf(r[0]), i2 = page.indexOf(r[1])
    if(i1 > i2) {
      comp = true
      const aux = page[i1]
      page[i1] = page[i2]
      page[i2] = aux
      x = 0
    }
  }
  return !comp ? 0 : page[Math.floor(page.length / 2)]
}

const getSumPages = ({pages, rules}) => {
  return pages.reduce((acc, page) => {
    return {
      p1: acc.p1 + checkPage(page, rules),
      p2: acc.p2 + checkWrongPage(page, rules)
    }
  }, {p1: 0, p2: 0})
}

const {p1, p2} = getSumPages(parse(input))
// console.time('p1')
// console.timeEnd('p1')
// console.time('p2')
// console.timeEnd('p2')

console.log({p1, p2})