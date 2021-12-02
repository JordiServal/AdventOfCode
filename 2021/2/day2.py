from re import search

horizontal = 0
depth = 0
aim = 0
instructions = []
numbers = []
index = 0

with open('input2.txt') as f:
    for line in f:
        if search("forward", line):
            instructions.append("forward")
        elif search("up", line):
            instructions.append("up")
        elif search("down", line):
            instructions.append("down")
        numbers.append(int(line.rpartition(" ")[2][0]))
    print(instructions)
    print(numbers)
    for number in numbers:
        if instructions[index] == "forward":
            horizontal = horizontal + number
            depth = depth + aim * number
        elif instructions[index] == "up":
            aim = aim - number
        elif instructions[index] == "down":
            aim = aim + number
        index = index + 1
    print(horizontal * depth)
