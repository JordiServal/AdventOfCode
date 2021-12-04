with open('C:\\input.txt') as file:
    bitlist = [line.strip() for line in file.readlines()]

listLenght = len(bitlist)
posSumList = []
for item in bitlist:
    for idx in range(len(item)):        
        if not posSumList or idx >= len(posSumList):
            posSumList.append(int(item[idx]))
        else:
            posSumList[idx] += int(item[idx])

gammaBin = ''.join(['1' if b >= listLenght / 2 else '0' for b in posSumList])
epsilonBin = ''.join(['0' if b >= listLenght / 2 else '1' for b in posSumList])

print('Power cosumption: {}'.format(int(gammaBin, 2) * int(epsilonBin, 2)))


#-------------------------------PART 2------------------------------------#
def GetByBitAndIdx(itemList: list, idx: int, ifequal: int):
    listlen = len(itemList)
    if listlen == 1:
        return itemList
    validList = []
    mostCommonBit = None
    itemSum = sum([int(i[idx]) for i in itemList])
    if  itemSum > (listlen / 2):
        mostCommonBit = 1 if ifequal == 1 else 0
    elif itemSum == listlen / 2:
        mostCommonBit = ifequal
    else:
        mostCommonBit = 0 if ifequal == 1 else 1
    
    for item in itemList:
        if int(item[idx]) == mostCommonBit:
            validList.append(item)
    return validList

itemLenght = len(bitlist[0])
oxigenList = list(bitlist)
co2List = list(bitlist)
for idx in range(itemLenght):
    if len(oxigenList) == 1 and len(co2List) == 1:
        break    
    oxigenList = GetByBitAndIdx(oxigenList, idx, 1)
    co2List = GetByBitAndIdx(co2List, idx, 0)

print('Life support rating: {}'.format(int(oxigenList[0], 2) * int(co2List[0], 2)))