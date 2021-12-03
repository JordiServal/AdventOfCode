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

console.log("Power: ", getPower(input))