boardSize = 5

def MarkNumber(num: int, board):
    for line in board:
        if num in line:
            line[num] = 1

def IsWinner(board):
    for line in board:
        if sum(list(line.values())) == boardSize:
            return True
    for col in range(len(board)):
        columnMarks = sum([list(x.values())[col] for x in board])
        if columnMarks == boardSize:
            return True
    return False

def CalcBoardScore(board, winnerNum):
    score = 0
    for line in board:
        score += sum([k for k in line if line[k] == 0])
    return score * winnerNum

with open('C:\\input.txt') as file:
    numbers = [int(num) for num in file.readline().split(',')]
    rawBoards = [{int(n) : 0 for n in x.strip().split()} for x in file.readlines() if x != '\n']
boardList = [rawBoards[idx : idx + boardSize] for idx in range(0, len(rawBoards), boardSize)]

haveWinner = False
winnersCount = 0
idxWinnerList = []
lastWinnerScore = 0
firstWinnerScore = 0
for num in numbers:
    for board in boardList:
        boardIdx = boardList.index(board)
        MarkNumber(num, board)
        if IsWinner(board) and boardIdx not in idxWinnerList:
            winnersCount += 1
            idxWinnerList.append(boardIdx)
            if len(idxWinnerList) == 1:
                firstWinnerScore = CalcBoardScore(board, num)
            if winnersCount == len(boardList):
                lastWinnerScore = CalcBoardScore(board, num)
                break

print('First winning board score: {}'.format(firstWinnerScore))
print('Last winning board score: {}'.format(lastWinnerScore))