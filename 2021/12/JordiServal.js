const input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

const parseInput = (i) => {
  return i.split('\n').map(path => path.split('-'))
} 

const checkUpper = (str) => str === str.toUpperCase()

const buildTree = (i) => {
  const tree ={}
  i.forEach(path => {
    if(!tree[path[0]]){
      tree[path[0]] = []
    }
    if(!tree[path[1]]){
      tree[path[1]] = []
    }
    if(path[0] !== "end" && path[1] !== "start")
      tree[path[0]].push(path[1])
    if(path[1] !== "end" && path[0] !== "start")
      tree[path[1]].push(path[0])
  })
  return tree
}

const tree = buildTree(parseInput(input))

const getPaths = (actual, visited, twice = false) => {
  const paths = []
  const actualNode = tree[actual]
  if(actualNode.length === 0){
      paths.push([actual])
      return paths
  }
  if(!checkUpper(actual) && visited[actual] > 0){
    if(twice !== actual){
      return false
    } else if(visited[actual] === 2){
      return false
    }

  }
  visited[actual] ++
  actualNode.forEach(node => {
    const deriv = getPaths(node, visited, twice)
    if(deriv !== false)
      deriv.forEach(p => {
          paths.push([actual, ...p])
      })
  })
  visited[actual] --

  return paths
}

const cleanPaths = (paths) => paths.filter(path => path[path.length-1] === 'end')

const getSmNodes = () => Object.keys(tree).filter(n => n !== 'start' && n !== 'end' && !checkUpper(n))

const getVisited = () => {
  const visited = {}
  Object.keys(tree).forEach(v => visited[v] = 0)
  return visited
}

const mergeArray = (arr1, arr2) => {
  arr2.forEach(l => {
    l = l.join(',')
    if(!arr1.includes(l)) arr1.push(l)
  })
  return arr1
}

const getTwicePaths = () => {
  return getSmNodes().reduce((acc, sm) => mergeArray(acc, getPaths('start', getVisited(), sm)), [])

}

console.log("Tree", tree)
console.log("Paths: ", getPaths("start", getVisited()))
console.log("Paths twice: ", getTwicePaths())
