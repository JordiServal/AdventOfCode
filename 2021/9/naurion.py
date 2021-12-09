from functools import reduce
import operator

with open('C:\\input.txt') as file:
    heightmap = [list(map(lambda x: int(x), n.strip())) for n in file.readlines()]

def CheckLowPoints(heightmap: list):
    lowPoints = []
    rowsCount = len(heightmap)
    for rowIdx, row in enumerate(heightmap):
        colCount = len(row)
        for pointIdx, point in enumerate(row):
            basin = [(rowIdx, pointIdx)]
            if ((pointIdx == colCount - 1 or point < row[pointIdx + 1])
                and (pointIdx == 0 or point < row[pointIdx - 1])
                and (rowIdx == rowsCount - 1 or point < heightmap[rowIdx + 1][pointIdx])
                and (rowIdx == 0 or point < heightmap[rowIdx - 1][pointIdx])):
                left = CheckBasin(point, heightmap, rowIdx, pointIdx - 1)
                right = CheckBasin(point, heightmap, rowIdx, pointIdx + 1)
                up = CheckBasin(point, heightmap, rowIdx - 1, pointIdx)
                down = CheckBasin(point, heightmap, rowIdx + 1, pointIdx)
                basin += left + right + down + up
                lowPoints.append((point, len(set(basin))))
    return lowPoints

def CheckBasin(point: int, heightmap: list, rowIdx: int, colIdx: int):
    if (rowIdx < 0 or len(heightmap) <= rowIdx 
        or colIdx < 0 or len(heightmap[rowIdx]) <= colIdx):
        return []
    pointToCheck = heightmap[rowIdx][colIdx]
    if pointToCheck != 9 and point < pointToCheck:     
        left = CheckBasin(pointToCheck, heightmap, rowIdx, colIdx - 1)
        right = CheckBasin(pointToCheck, heightmap, rowIdx, colIdx + 1)
        up = CheckBasin(pointToCheck, heightmap, rowIdx - 1, colIdx)
        down = CheckBasin(pointToCheck, heightmap, rowIdx + 1, colIdx)
        return list(set([(rowIdx, colIdx)] + left + right + down + up))
    else:
        return []

lp = CheckLowPoints(heightmap)
result = sum(n[0] + 1 for n in lp)
print(f'Part 1 sol: {result}')
basinList = [n[1] for n in lp]
basinList.sort(reverse=True)
top3Prod = reduce(operator.mul, basinList[:3])
print(f'Part 2 sol: {top3Prod}')