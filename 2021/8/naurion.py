digit1Seg = 2
digit4Seg = 4
digit7Seg = 3
digit8Seg = 7
with open('C:\\input.txt') as file:
    entries = [s.strip('\n').split('|') for s in file.readlines()]
uniqueDigitsSeg = 0
for output in [o[1] for o in entries]:
    for digit in output.split():
        uniqueDigitsSeg += 1 if len(digit) in [digit1Seg, digit4Seg, digit7Seg, digit8Seg] else 0

print(f'Part 1 sol: {uniqueDigitsSeg}')

def GetKnownNumbers(patterns: list, digitDict: dict):
    for d in patterns:
        dLen = len(d)
        if dLen == digit1Seg:
            digitDict[1] = d
        elif dLen == digit4Seg:
            digitDict[4] = d
        elif dLen == digit7Seg:
            digitDict[7] = d
        elif dLen == digit8Seg:
            digitDict[8] = d

def ParseUnknownNumbers(patterns: list, digitDict: dict):
    for p in patterns:
        pLen = len(p)
        pSet = set(p)        
        if pLen == 6 and len(set(digitDict[1]) - pSet) == 1 :
            digitDict[6] = p
        elif pLen == 6 and len(set(digitDict[8]) - set(digitDict[4]) - pSet) == 1:
            digitDict[9] = p
        elif pLen == 6:
            digitDict[0] = p
        elif pLen == 5 and len(set(digitDict[1]) - pSet) == 0:
            digitDict[3] = p
        elif pLen == 5 and len(set(digitDict[4]) - set(digitDict[1]) - pSet) == 0:
            digitDict[5] = p
        elif pLen == 5:
            digitDict[2] = p

def ReverseDictionary(d: dict):
    newDict = {}
    for k, v in d.items():
        newDict[''.join(sorted(v))] = k
    return newDict


outputSum = 0
for line in entries:
    outputNum = 0
    digitDict = {}
    patterns = line[0].split()
    GetKnownNumbers(patterns, digitDict)
    patterns = [p for p in patterns if p not in digitDict.keys()]
    ParseUnknownNumbers(patterns, digitDict)
    patternsDict = ReverseDictionary(digitDict)
    for i, output in enumerate(line[1].split()):
        sortedOutput = ''.join(sorted(output))
        if sortedOutput in patternsDict.keys():
            outputNum += patternsDict[sortedOutput] * (10 **(3 - i))
    outputSum += outputNum
print(f'Part 2 sol: {outputSum}')