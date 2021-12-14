with open('C:\\input.txt') as file:
    lines = [l.rstrip() for l in file.readlines()]

def AddCaveToDict(cavesDict: dict, key, value):
    cavesDict[key] = cavesDict[key] + [value] if key in cavesDict.keys() else [value]

def MakePath(cavesDict: dict, currCave, currPath, pathList: list, smallVisit = 1):
    currPath += f'{"," if currCave != "start" else ""}{currCave}'
    for nextCave in cavesDict[currCave]:
        cavesVisited = currPath.replace('start', '').replace('end', '')
        if smallVisit == 1:
            canRevisitSmall = currPath.count(nextCave) < smallVisit
        else:
            cavesVisitedTwice = [cave for cave in cavesDict.keys() if cave.islower() and cavesVisited.count(cave) == smallVisit]
            canRevisitSmall = (nextCave.islower() and 
                                (len(cavesVisitedTwice) == 0 or cavesVisited.count(nextCave) == 0))
        if nextCave == 'end':
            pathList.append(f'{currPath},end')         
        elif nextCave != 'start' and (nextCave.isupper() or canRevisitSmall):           
            pathList = MakePath(cavesDict, nextCave, currPath, pathList, smallVisit)
    return pathList


cavesDict = {}
for line in lines:
    connCaves = line.split('-')
    if connCaves[1] == 'start' or connCaves[0] == 'end':        
        AddCaveToDict(cavesDict, connCaves[1], connCaves[0])
    else:
        AddCaveToDict(cavesDict, connCaves[0], connCaves[1])
        AddCaveToDict(cavesDict, connCaves[1], connCaves[0])

paths = []
for nextCave in cavesDict['start']:
    paths += MakePath(cavesDict, nextCave, 'start', [])
print(f'Part 1 sol: {len(paths)}')

paths2 = []
for nextCave in cavesDict['start']:
    paths2 += MakePath(cavesDict, nextCave, 'start', [], 2)
print(f'Part 2 sol: {len(paths2)}')
