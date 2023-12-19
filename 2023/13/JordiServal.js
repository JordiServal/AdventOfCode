const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = input => input.split('\n\n').map(line => line.split('\n').map(e => e.trim()))
const transpose = a => Object.keys(a[0]).map(c => a.map(r => r[c] ));

const checkReflect = (arr, index) => {
  let check = true
  if(index < arr.length / 2) {
    for(let i = index; i > 0; i--) {
      if(arr[i - 1] !== arr[2 * index - i]) check = false
    }
  } else {
    for(let i = index; i < arr.length; i++) {
      if(arr[i] !== arr[index * 2 - i - 1]) check = false
    }
  }
  return check ? index : 0
}

const getReflections = patterns => {
   return patterns.reduce((acc, pat) => {
    let reflect = 0
    // Check horizontal
    pat.reduce((prev, curr, index) => {
      if(!reflect && prev === curr) {
        reflect = checkReflect(pat, index)
      }
      return curr
    })
    if(!reflect) {
      // Check vertical
      pat = pat.map(l => l.split(''))
      const vertical = transpose(pat).map(l => l.join(''))
      vertical.reduce((prev, curr, index) => {
        if(!reflect && prev === curr) {
          reflect = checkReflect(vertical, index)
        }
        return curr
      })
      acc += reflect
    } else {
      acc += reflect * 100
    }
    return acc
  }, 0)
}

const checkLines = (a, b, smudged) => {
  return [!a.some((c, index) => {
    if(c === b[index]) return false
    else if(smudged) return true
    smudged = true
    return false
  }), smudged]
}

const checkReflectSm = (arr, index, smudged) => {
  let check = true, checkL = false
  if(index < arr.length / 2) {
    for(let i = index; i > 0; i--) {
      [checkL, smudged] = checkLines(arr[i - 1], arr[2 * index - i], smudged)
      // console.log('Up', i, arr[i - 1], 2 * index - i, arr[2 * index - i], checkL, smudged)
      if(!checkL) check = false
    }
  } else {
    for(let i = index; i < arr.length; i++) {
      [checkL, smudged] = checkLines(arr[i], arr[index * 2 - i - 1], smudged)
      // console.log('Down', i, arr[i], index * 2 - i - 1, arr[index * 2 - i - 1], checkL, smudged)
      if(checkL) check = false
    }
  }
  return check && smudged ? index : 0
}

const getSmudgeReflect = patterns => {
   return patterns.reduce((acc, pat) => {
    console.log({acc})
    let reflect = 0, smudged = false, check = false
    pat = pat.map(l => l.split(''))
    // Check horizontal
    pat.reduce((prev, curr, index) => {
      if(!reflect) {
        [check, smudged] = checkLines(prev, curr, smudged)
        if(check) {
          reflect = checkReflectSm(pat, index, smudged)
        } else {
          smudged = false
        }
      }
      return curr
    })
    if(!reflect) {
      console.log('Vertkca')
      smudged = false
      // Check vertical
      const vertical = transpose(pat)
      vertical.reduce((prev, curr, index) => {
        if(!reflect) {
          [check, smudged] = checkLines(prev, curr, smudged)
          if(check) {
            reflect = checkReflectSm(pat, index, smudged)
          } else {
            smudged = false
          }
        }
        return curr
      })
      acc += reflect
    } else {
      acc += reflect * 100
    }
    return acc
  }, 0)
}

const part1 = getReflections(parse(input))
const part2 = getSmudgeReflect(parse(input))
console.log({part1, part2})
