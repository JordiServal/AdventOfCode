const input = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`


const matchEveryChar = (word, characters) => {
  return characters.split('').find(v => !word.includes(v)) === undefined
}

const countCoincidences = (word, characters) => {
  return characters.split('').reduce((acc, v) => acc + (word.includes(v) ? 1 : 0), 0)
}

const getDigits = (i) => {
  return i.reduce((acc, line) => {
    line = line.split(' | ').pop()
    line = line.split(' ')
    return acc + line.reduce((lineAcc, digit) => digit.length === 2 || digit.length === 4 || digit.length === 3 || digit.length === 7 ? lineAcc + 1 : lineAcc, 0)
  }, 0)
}

const getLegend = (i) => {
  const legend = {}
  i.forEach(v => {
      if(v.length === 2) legend.v1 = v
      if(v.length === 4) legend.v4 = v
      if(v.length === 3) legend.v7 = v
      if(v.length === 7) legend.v8 = v
  })
  i.forEach(v => {
      if(v.length === 5) {
        if(countCoincidences(v, legend.v1) === 2) legend.v3 = v
        else if(countCoincidences(v, legend.v4) === 3) legend.v5 = v
        else legend.v2 = v
      }
      if(v.length === 6) {
        if(countCoincidences(v, legend.v1) === 2) 
          if(countCoincidences(v, legend.v4) === 4) legend.v9 = v
          else legend.v0 = v 
        else legend.v6 = v

      }
  })
  return legend
}

const getSumDigits = (i) => {
  return i.reduce((acc, line) => {
    line = line.split(' | ')
    const legend = getLegend(line[0].split(' '))
    line = line[1].split(' ')
    const digit = line.reduce((lineAcc, signal) => {
      if(signal.length === 2) signal = 1
      if(signal.length === 4) signal = 4
      if(signal.length === 3) signal = 7 
      if(signal.length === 7) signal = 8
      if(signal.length === 5) {
        signal = matchEveryChar(signal, legend.v5) ? 5 : matchEveryChar(signal, legend.v2) ? 2 : 3
      }
      if(signal.length === 6) {
        signal = matchEveryChar(signal, legend.v9) ? 9 : matchEveryChar(signal, legend.v6) ? 6 : 0
      }
      return lineAcc + signal
    }, '')
    return acc + parseInt(digit)
  }, 0)
}

console.log("Singular digits: ", getDigits(input.split('\n')))
console.log("Sum digits: ", getSumDigits(input.split('\n')))