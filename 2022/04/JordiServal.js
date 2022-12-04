const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.trim().split(','));

const getFullyContained = (pairs) => {
  return pairs.reduce((acc, [first, second]) => {
    first = first.split('-').map((n) => parseInt(n));
    second = second.split('-').map((n) => parseInt(n));
    if(
      (first[0] <= second[0] && first[1] >= second[1]) || 
      (first[0] >= second[0] && first[1] <= second[1])
    ) acc ++
    return acc
  }, 0)
}

const getOverlaped = (pairs) => {
  return pairs.reduce((acc, [first, second]) => {
    first = first.split('-').map((n) => parseInt(n));
    second = second.split('-').map((n) => parseInt(n));
    if( 
      (first[0] <= second[0] && first[1] >= second[0]) || 
      (first[0] <= second[1] && first[1] >= second[1]) ||
      (first[0] <= second[0] && first[1] >= second[0]) ||
      (first[0] >= second[0] && first[0] <= second[1]) ||
      (first[1] >= second[0] && first[1] <= second[1])
    ) acc ++
    return acc
  }, 0)
}
  

const part1 = getFullyContained(input);
const part2 = getOverlaped(input);


console.log({part1, part2})