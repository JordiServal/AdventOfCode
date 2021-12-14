class Point:
    x = 0
    y = 0

    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __eq__(self, point):
        return self.x == point.x and self.y == point.y
    def __hash__(self):
        return hash((self.x, self.y))


def FoldedPosition(pos: int, foldPos: int):
    return (foldPos - 1) - (pos - (foldPos + 1))

def FoldHorizontal(points: list, foldPos: int):
    for i, point in enumerate(points):
        if point.y > foldPos:
            a = FoldedPosition(point.y, foldPos)
            points[i] = Point(point.x, FoldedPosition(point.y, foldPos))
        elif point.y == foldPos:
            del points[i]

def FoldVertical(points: list, foldPos: int):
    for i, point in enumerate(points):
        if point.x > foldPos:
            points[i] = Point(FoldedPosition(point.x, foldPos), point.y)
        elif point.x == foldPos:
            del points[i]

def CreatePaper(points: list):
    maxX = max([p.x for p in points])
    maxY = max([p.y for p in points])
    paper = [['.' for x in range(maxX + 1)] for y in range(maxY + 1)]
    for point in points:
        paper[point.y][point.x] = '#'
    return paper

def PrintPaper(paper):
    for row in paper:
        print(''.join(row))

folds = [('x', 655), ('y', 447), ('x', 327), ('y', 223), ('x', 163), ('y', 111), ('x', 81), ('y', 55), ('x', 40), ('y', 27), ('y', 13), ('y', 6)]
#folds = [('y', 7), ('x', 5)]

with open('C:\\input.txt') as file:
    lines = [l.rstrip() for l in file.readlines()]
points = [Point(int(x.split(',')[0]), int(x.split(',')[1])) for x in lines]

if folds[0][0] == 'x':
    FoldVertical(points, folds[0][1])
elif folds[0][0] == 'y':
    FoldHorizontal(points, folds[0][1])
print(f'Part 1 sol (dots after first fold): {len(set(points))}')
        
for axis, fold in folds[1:]:
    if axis == 'y':
        FoldHorizontal(points, fold)
    elif axis == 'x':
        FoldVertical(points, fold)
points = list(set(points))
paper = CreatePaper(points)    
PrintPaper(paper)
