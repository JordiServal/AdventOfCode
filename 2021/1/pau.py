# Primera vez que programo en Python, perdon si os lloran los ojos

count = -1
lineBefore = 0
index = 0
arr = []
res = []
elemBefore = 0
count2 = -1

# Primer problema
with open('input.txt') as f:
    for line in f:
        if int(line) > int(lineBefore):
            count = count + 1
        lineBefore = line
    print(count)

# Segon problema
with open('input.txt') as f:
    for line in f:
        arr.append(int(line))
    while index < len(arr) - 2:
        letterSum = arr[index] + arr[index + 1] + arr[index + 2]
        index = index + 1
        res.append(letterSum)
    for elem in res:
        if elem > elemBefore:
            count2 = count2 + 1
        elemBefore = elem
    print(count2)
