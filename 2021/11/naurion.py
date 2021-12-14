with open('C:\\input.txt') as file:
    octopuses = [list(map(lambda x: (int(x), False), n.strip())) for n in file.readlines()]

def FlashExpanse(octoList: list, rowIdx: int, colIdx: int):
    besideOctopus = [(rowIdx - 1, colIdx - 1), (rowIdx - 1, colIdx), (rowIdx - 1, colIdx + 1),
                        (rowIdx, colIdx - 1), (rowIdx, colIdx + 1),
                        (rowIdx + 1, colIdx - 1), (rowIdx + 1, colIdx), (rowIdx + 1, colIdx + 1)]
    for r, c in besideOctopus:
        if r < 0 or r == len(octoList) or c < 0 or c == len(octoList[r]):
            continue
        octopus = octoList[r][c]
        if octopus[0] == 9:
            octoList[r][c] = (10, True)
            FlashExpanse(octoList, r, c)
        elif octopus[0] < 10:
            octoList[r][c] = (octopus[0] + 1, octopus[1])

def AddStep(octopus):
    if octopus[0] < 9:
        return (octopus[0] + 1, False)
    elif octopus[0] == 9:
        return (10, True)
    else:
        return octopus


steps = 100
totalFlashes = 0
step = 0
flashes = 0
totalOctopuses = sum([sum([1 for o in ol]) for ol in octopuses])
while flashes < len(octopuses) * len(octopuses):
    step += 1
    for row, octoList in enumerate(octopuses):
        for col, octopus in enumerate(octoList):
            octopuses[row][col] = AddStep(octopus)
            if octopuses[row][col][0] == 10 and octopus[1] == False:
                FlashExpanse(octopuses, row, col)
    flashes = sum([sum([1 if o[0] == 10 else 0 for o in ol]) for ol in octopuses])
    if step <= 100:
        totalFlashes += flashes
    octopuses = [[(o[0] % 10, False) for o in ol] for ol in octopuses]
print(f'Part 1 sol (flashes at step 100): {totalFlashes}')
print(f'Part 2 sol (step of which all octopuses flash): {step}')
