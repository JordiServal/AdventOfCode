import re


with open('C:\\input.txt') as file:
    lines = [l.rstrip() for l in file.readlines()]

steps = 10
polymer = lines[0]
rules = {}
rePattern = re.compile('(\w+) -> (\w)')
for line in lines[1:]:
    match = rePattern.match(line)
    if match != None:
        key = match.group(1)
        value = match.group(2)
        rules[key] = value

resultPolymer = ''
for step in range(steps):
    for i, char in enumerate(polymer):
        resultPolymer += char
        if i < len(polymer) - 1:
            pair = char + polymer[i + 1]
            resultPolymer += rules.get(pair, '')
    polymer = resultPolymer
    resultPolymer = ''

maxElement = 0
minElement = 0    
for c in set(polymer):
    occ = polymer.count(c)
    maxElement = occ if occ > maxElement else maxElement
    minElement = occ if minElement == 0 or occ < minElement else minElement

print(f'Part 1 sol: {maxElement - minElement}')

polymer = lines[0]
pairDict = {}
letterCount = {}
for i, el in enumerate(polymer):
    letterCount[el] = letterCount.get(el, 0) + 1
    if i < len(polymer) - 1:
        pairDict[el + polymer[i + 1]] = pairDict.get(el + polymer[i + 1], 0) + 1

steps = 40
for step in range(steps):
    auxList = {}
    for k in  pairDict:
        newEl = rules.get(k, '')
        nwPair1 = k[0] + newEl
        nwPair2 = newEl if len(k) == 1 else newEl + k[1]
        auxList[nwPair1] = pairDict[k] + auxList.get(nwPair1, 0)
        auxList[nwPair2] = pairDict[k] + auxList.get(nwPair2, 0)
        letterCount[newEl] = letterCount.get(newEl, 0) + pairDict[k]
    pairDict = auxList.copy()

maxValue = sorted(letterCount.values(), reverse=True)[0]
minValue = sorted(letterCount.values())[0]
    
print(f'Part 2 sol: {maxValue - minValue}')
