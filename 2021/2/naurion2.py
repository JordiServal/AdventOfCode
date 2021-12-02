depthPos = 0
horizontalPos = 0
aim = 0

with open('C:\\input2.txt') as file:
    readList = file.readlines()

for instr in readList:
    move, distStr = instr.split()
    dist = int(distStr)

    if move == 'forward':
        horizontalPos += dist
        depthPos += dist * aim
    elif move == 'down' :
        #depthPos += dist
        aim += dist
    elif move == 'up':
        #depthPos -= dist
        aim -= dist

print('{} * {} = {}'.format(depthPos, horizontalPos, depthPos * horizontalPos))