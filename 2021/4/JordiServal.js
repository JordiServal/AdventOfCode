const input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`

const getBingo = (input) => {
  const split = input.split('\n\n')
  const numSeq = split.shift()
  const boards = split.map((board) => {
    return board.split('\n').map(line => line.trim().replace(/ {2,}/g, ' ').split(" "))
  })
  return numSeq.split(',').reduce((win, num) => {
    win = win !== undefined ? win : boards.reduce((win2, board, iC) => {
      win2 = win2 !== undefined ? win2 : board.reduce((win3, line, iL) => {
        let index = 0
        if(win3 === undefined)
          if ((index = line.indexOf(num)) !== -1) {
            boards[iC][iL][index] = -1
            if(line.reduce((acc, n)=>acc+parseInt(n), 0) === -5 || board.reduce((acc, n) => acc+ parseInt(n[index]), 0) === -5) {
              return num * board.reduce((total, cLine) => total + cLine.reduce((totalLine, cNum)  => parseInt(totalLine) + (cNum !== -1 ? parseInt(cNum) : 0), 0), 0)
            }
          }
        return win3
      }, undefined)
      return win2
    }, undefined)
    return win
  }, undefined)
}

const getLastBingo = (input) => {
  const split = input.split('\n\n')
  const numSeq = split.shift()
  const boards = split.map((board) => {
    return board.split('\n').map(line => line.trim().replace(/ {2,}/g, ' ').split(" "))
  })
  return numSeq.split(',').reduce((win, num) => {
    win = win !== undefined ? win : boards.reduce((win2, board, iC) => {
      win2 = win2 !== undefined ? win2 : board.reduce((win3, line, iL) => {
        let index = 0
        if(win3 === undefined)
          if ((index = line.indexOf(num)) !== -1) {
            boards[iC][iL][index] = -1
            if(line.reduce((acc, n)=>acc+parseInt(n), 0) === -5 || board.reduce((acc, n) => acc+ parseInt(n[index]), 0) === -5) {
              if(boards.reduce((prev, currBoard) => currBoard.length !== 0 ? prev+1 : prev, 0) === 1)
                return num * board.reduce((total, cLine) => total + cLine.reduce((totalLine, cNum)  => parseInt(totalLine) + (cNum !== -1 ? parseInt(cNum) : 0), 0), 0)
              boards[iC] = []
            }
          }
        return win3
      }, undefined)
      return win2
    }, undefined)
    return win
  }, undefined)
}

console.log("Bingo!", getBingo(input))
console.log("Last Bingo!", getLastBingo(input))