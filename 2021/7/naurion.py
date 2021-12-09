def CalculateFuelSpent(items: list, pos: int, part2 = False):
    fuelSpent = 0
    for item in items:
        diff = abs(item - pos)
        fuelSpent += diff if not part2 else int(diff * (diff + 1) / 2)
    return fuelSpent

def GetMorePopulatedZone(items: list):
    if max(items, key=items.count) == len(items) or len(items) == 1:
        return items[0]
    else:
        if len(set(items)) == 2:
            return max(items)
        else:
            maxPos = max(items)
            minPos = min(items)
        diff = abs(maxPos - minPos)
        lowerHalf = [x for x in items if x < float(diff / 2)]
        upperHalf = [x for x in items if x >= float(diff / 2)]
        if len(lowerHalf) > len(upperHalf):
            return GetMorePopulatedZone(lowerHalf)
        else:
            return GetMorePopulatedZone(upperHalf)


with open('C:\\input.txt') as file:
    crabs = [int(num) for num in file.readline().split(',')]

pos = GetMorePopulatedZone(crabs)
print(CalculateFuelSpent(crabs, pos))
fuelSpent = -1

for i in [x for x in range(min(crabs), max(crabs) + 1)]:
    fuel = CalculateFuelSpent(crabs, i, True)
    if fuelSpent == -1 or fuel < fuelSpent:
        fuelSpent = fuel

print(fuelSpent)
