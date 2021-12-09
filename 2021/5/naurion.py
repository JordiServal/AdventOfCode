def ExpandDiagram(diagram, x, y):
    if len(diagram) <= x:
        diagram += [[] for i in range(x + 1)]
    if len(diagram[x]) <= y:
        diagram[x] += [0 for j in range(y + 1)]

class Vector:
    x1 = 0
    y1 = 0
    x2 = 0
    y2 = 0
    def __init__(self, x1, y1, x2, y2):
        self.x1 = x1
        self.y1 = y1
        self.x2 = x2
        self.y2 = y2
    
    def __getUpDown__(self, x, y):
        return 1 if x < y else -1

    def MarkDiagram(self, diagram, overlapedCount):
        #Part 1 func
        #if self.x1 == self.y1 and self.x2 == self.y2:
         #   upDown = self.__getUpDown__(self.x1, self.x2)
          #  for x in range(self.x1, self.x2 + 1, upDown):
           #     diagram[x][x] += 1
            #    if diagram[x][x] == 2:
             #       overlapedCount += 1
        
        if abs(self.x1 - self.x2) == abs(self.y1 - self.y2):
            upDownX = self.__getUpDown__(self.x1, self.x2)
            upDownY = self.__getUpDown__(self.y1, self.y2)
            diff = abs(self.x1 - self.x2)
            for i in range(diff + 1):
                x = self.x1 + i * upDownX
                y = self.y1 + i * upDownY
                ExpandDiagram(diagram, x, y)
                diagram[x][y] += 1
                if diagram[x][y] == 2:
                    overlapedCount += 1

        if (self.x1 == self.x2):
            upDown = 1 if self.y1 < self.y2 else -1
            for y in range(self.y1, self.y2 + upDown, upDown):
                ExpandDiagram(diagram, self.x1, y)
                diagram[self.x1][y] += 1
                if diagram[self.x1][y] == 2:
                    overlapedCount += 1
        if (self.y1 == self.y2):
            upDown = 1 if self.x1 < self.x2 else -1
            for x in range (self.x1, self.x2 + upDown, upDown):
                ExpandDiagram(diagram, x, self.y1)
                diagram[x][self.y1] += 1
                if diagram[x][self.y1] == 2:
                    overlapedCount += 1
        return overlapedCount

with open('C:\\input.txt') as file:
    filelines = file.readlines()
diagram = []
rawVectors = [[x.split(',') for x in line.strip().split('->')] for line in filelines]
vectorList = [Vector(int(v[0][0]), int(v[0][1]), int(v[1][0]), int(v[1][1])) for v in rawVectors]
overlapedCount = 0
for v in vectorList:
    overlapedCount = v.MarkDiagram(diagram, overlapedCount)
print(overlapedCount)
