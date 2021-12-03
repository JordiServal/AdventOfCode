const input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

const getPower = (i) => {
  const countNumber = i.split('\n').reduce((prev, line, key, array) => {
    line.split('').forEach((letter, key) => {
      if(!prev[key]) prev.push({})
      prev[key][letter] = prev[key][letter] ? prev[key][letter]+1 : 1
    })
    return prev
  }, [])

  console.log(countNumber)
  const {gamma, epsilon} = countNumber.reduce((prev, value) =>  {
    prev.gamma.push(Object.keys(value).reduce((a, b) => value[a] > value[b] ? a : b))
    prev.epsilon.push( Object.keys(value).reduce((a, b) => value[a] < value[b] ? a : b))

    return prev
    
  }, {gamma:[], epsilon: []} )

  return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2)
}

const getLifeRate = (i) => {  
  const getO2 = (values, key) => {
    const {ones, zeros} = values.reduce((prev, value) =>  {
      if(value[key] === '1') prev.ones.push(value)
      else prev.zeros.push(value)
      return prev
    }, {ones: [], zeros: []})
    values = ones.length >= zeros.length ? ones : zeros
    if(values.length === 1) return values[0]
    return getO2(values, ++key)
  }
  const getCO2 = (values, key) => {
    const {ones, zeros} = values.reduce((prev, value) =>  {
      if(value[key] === '1') prev.ones.push(value)
      else prev.zeros.push(value)
      return prev
    }, {ones: [], zeros: []})
    values = ones.length >= zeros.length ? zeros : ones
    if(values.length === 1) return values[0]
      
    return getCO2(values, ++key)
  }

  const {ones, zeros} = i.reduce((prev, value) =>  {
    value = value.split('')
    if(value[0] === '1') prev.ones.push(value)
    else prev.zeros.push(value)
    return prev
  }, {ones: [], zeros: []})
  let o2, co2
  if(ones.length >= zeros.length) {
    o2 = getO2(ones, 1)
    co2 = getCO2(zeros, 1)
  }else{
    o2 = getO2(zeros, 1)
    co2 = getCO2(ones, 1)
  }
  return parseInt(o2.join(''), 2) * parseInt(co2.join(''), 2)
}

console.log("Power: ", getPower(input))

console.log("O2 * CO2 ", getLifeRate(input.split('\n')))