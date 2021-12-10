chunks = { '(': ')', '[': ']', '{': '}', '<': '>' }
chunksAcPoints = { ')': 1, ']': 2, '}': 3, '>': 4 }

def GetClosingSeq(unclosedChunks: list):
    closingSeq = []
    for chunk in reversed(unclosedChunks):
        closingSeq.append(chunks[chunk])
    return closingSeq

with open('C:\\input.txt') as file:
    lines = [l.strip() for l in file.readlines()]


score = 0
illegalChunksFound = []
autocomplStrings = []
for line in lines:
    unClosedChunks = []
    for i, c in enumerate(line):
        if c in chunks.keys():
            unClosedChunks.append(c)
        elif c in chunks.values() and chunks[unClosedChunks[-1]] != c:
            illegalChunksFound.append(c)
            break
        else:
            del unClosedChunks[-1]
        if i == len(line) - 1:
            autocomplStrings.append(GetClosingSeq(unClosedChunks))

score = illegalChunksFound.count(')') * 3 + illegalChunksFound.count(']') * 57 + illegalChunksFound.count('}') * 1197 + illegalChunksFound.count('>') * 25137
print(f'Part 1 sol: {score}')
autocompScores = []
for autoc in autocomplStrings:
    autocScore = 0
    for c in autoc:
        autocScore *= 5
        autocScore += chunksAcPoints[c]
    autocompScores.append(autocScore)

autocompScores.sort(reverse= True)
print(f'Part 2 sol: {autocompScores[(len(autocompScores) - 1) // 2]}')