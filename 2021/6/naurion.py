days = 256

def InsertOrAddDict(d: dict, key, value):
    if key in d.keys():
        d[key] += value
    else:
        d[key] = value

def TimerCount(fishDict):
    dictUpd = {}
    newBornFishes = 0   
    for i in list(fishDict.keys()):
        if i == 0:
            newBornFishes = fishDict[0]
        else:
            dictUpd[i - 1] = fishDict[i]
    
    InsertOrAddDict(dictUpd, 8, newBornFishes)
    InsertOrAddDict(dictUpd, 6, newBornFishes)
    return dictUpd

with open('C:\\input.txt') as file:
    fishList = [int(num) for num in file.readline().split(',')]
fishList2 = list(fishList)

#Part 1 sol
#for d in range(days):
#    newBornFishes = fishList.count(0)
#    fishList = list(map(lambda f: f - 1 if f > 0 else 6, fishList))
#    fishList.extend([8 for x in range(newBornFishes)])
#
#print(len(fishList))


fishDict = { k: fishList2.count(k) for k in list(set(fishList2))}

for d in range(days):
    fishDict = TimerCount(fishDict)

print(sum(list(fishDict.values())))            
