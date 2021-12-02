lastRead = 0
currentRead = 0
increases = 0

with open('C:\\reads.txt') as file:
    readList = file.readlines()

for index, n in enumerate(readList):    
    currentRead = int(n)
    if index != 0 and currentRead > lastRead:
        increases += 1
    
    lastRead = currentRead

#print(increases)


increases = 0
listLenght = len(readList)
idxPointer = 0
lastRead = 0
currentRead = 0

while (idxPointer + 2) < listLenght:
    currentRead = int(readList[idxPointer]) + int(readList[idxPointer + 1]) + int(readList[idxPointer + 2])
    if idxPointer != 0 and currentRead > lastRead:
        increases += 1

    lastRead = currentRead
    idxPointer += 1

print(increases)