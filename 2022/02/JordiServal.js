const path = require("path");
const fs = require("fs");

const move = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3  // Scissors
}

const results = {
  X: 0,
  Y: 3,
  Z: 6
}

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.trim());

const getScore = (input) => {
  return input.reduce((acc, curr) => {
    let [p1, p2] = curr.split(" ");
    p1 = move[p1];
    p2 = move[p2];
    if(p1 === p2) 
      acc += 3
    else if((p1 + 1) % 3 === p2 % 3)
      acc += 6
    return acc + p2
  }, 0)
}

const getMoveScore = (input) => {
  return input.reduce((acc, curr) => {
    let [p1, result] = curr.split(" ");
    if(result === "X") { // lose
      p1 = move[p1] - 1;
      acc += p1 < 1 ? 3 : p1;
    } else if(result === "Z") { // win
      p1 = move[p1] + 1;
      acc += p1 > 3 ? 1 : p1;
    } else { // draw
      acc += move[p1];
    }
    return acc + results[result]
  }, 0)
}
  
const part1 = getScore(input)
const part2 = getMoveScore(input)


console.log({part1, part2})