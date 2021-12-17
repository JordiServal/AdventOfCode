const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`

const parseInput = (i) => {
  return i.split('\n').map(e => e.split('').map(Number))
}

const getAdj = ([x,y], height, width) => {
	const adyacents = [];
	if(x > 0) adyacents.push([x - 1, y]);
	if(y > 0) adyacents.push([x, y - 1]);
	if(x + 1 < height)	adyacents.push([x + 1, y]);
	if(y + 1 < width) adyacents.push([x, y + 1]);
	return adyacents;
}

// Thanks to u/Tymscar for the dijkstra alg :)
const lowRisk = (matrix) => {
  let risk = 0
  const h = matrix.length
  const w = matrix[0].length
  const start = [0,0]
  const end =[h-1,w-1]
  const total = []
  const parent = []
  const visited = []
  let q = [start]
  matrix.forEach((l, y) => {
    l.forEach((e, x) => {
      total[[x, y]] = Infinity
      visited[[x, y]] = false
    })
  })
  total[start] = 0

  while (q.length > 0){
    let curr = q[0];
    q.forEach(elem => {
      if(total[elem] < total[curr])
        curr = elem;
    })

    q = q.filter(el => el[0] !== curr[0] || el[1] !== curr[1]);

    if(curr[0] === end[0] && curr[1] === end[1]){
      risk = 0;
      while (parent[curr]){
        risk += matrix[curr[0]][curr[1]];
        curr = parent[curr];
      }
      break;
    }

    getAdj(curr, h, w).forEach(pos => {
      if(visited[pos] === false) {
        const possibleCost = matrix[pos[0]][pos[1]] + total[curr];
        if (possibleCost < total[pos]) {
          total[pos] = possibleCost;
          parent[pos] = curr;
        }
        visited[pos] = true;
        q.push(pos);
      }
    });
  }

  return risk
}

const multiplyMatrix = (initM,  q) => {
  const w1 = initM[0].length
  const h1 = initM.length

  let addW = w1 * (q - 1)
  let newM = initM.map(l => {
    l.push(...Array(addW).fill(0))
    l = l.map((e, key) => {
      if(e===0) {
        const prev = l[key%w1]
        const adition = Math.floor(key/w1)
        e = e + prev + adition
        e = e / 10 >= 1 ? e%10+1 : e
      }
      return e
    })
    return l
  })
  const addH = h1 * (q-1)
  newM.push(...Array(addH).fill().map(l => Array(w1*q).fill(0)))
  newM = newM.map((l, y) => {
    l = l.map((e, x) => {
      if(e===0) {
        const prev = newM[y%h1][x]
        const adition = Math.floor(y/h1)
        e = e + prev + adition
        e = e / 10 >= 1 ? e%10+1 : e
      }
      return e
    })
    return l
  })

  return newM
}

console.log("Calculate low risk",  lowRisk(parseInput(input)))
console.log("Multiply matrix",  lowRisk(multiplyMatrix(parseInput(input), 5)))