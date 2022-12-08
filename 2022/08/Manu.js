const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "inputManu.txt"), "utf8")
  .toString()
  .split("\n")
  .map((x) => x.split(""))
  .filter((x) => x.length > 0);

function isVisible(i, j) {
  const tree = input[i][j];
  
  // from left
  let visible = true;
  for (let k = j - 1; k >= 0; k--) {
    if (input[i][k] >= tree) {
      visible = false
      break;
    }
  }
  if(visible) return true;
  visible = true;
  
  // from right
  for (let k = j + 1; k < input[i].length; k++) {
    if (input[i][k] >= tree) {
      visible = false
      break;
    }
  }
  if(visible) return true;
  visible = true;
  
  // from top
  for (let k = i - 1; k >= 0; k--) {
    if (input[k][j] >= tree) {
      visible = false
      break;
    }
  }
  if(visible) return true;
  visible = true;

  // from bottom
  for (let k = i + 1; k < input.length; k++) {
    if (input[k][j] >= tree) {
      visible = false
      break;
    }
  }
  if(visible) return true;
  visible = true;

  return false;
}

function part1(input) {
  let count = 0;
  for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
      if(isVisible(i, j)) count++;
    }
  }
  return count + input.length * 2 + input[0].length * 2 - 4;
}

function highestScore(i, j) {
  const tree = input[i][j];
  let left = 0;
  let right = 0;
  let top = 0;
  let bottom = 0;
  
  // from left
  for (let k = j - 1; k >= 0; k--) {
    left++;
    if (input[i][k] >= tree) {
      break;
    }
  }
  
  // from right
  for (let k = j + 1; k < input[i].length; k++) {
    right++;
    if (input[i][k] >= tree) {
      break;
    }
  }
  
  // from top
  for (let k = i - 1; k >= 0; k--) {
    top++;
    if (input[k][j] >= tree) {
      break;
    }
  }

  // from bottom
  for (let k = i + 1; k < input.length; k++) {
    bottom++;
    if (input[k][j] >= tree) {
      break;
    }
  }
  
  return left * right * top * bottom;
}
function part2(input) {
  let score = [];
  for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
      score.push(highestScore(i, j))
    }
  }
  return score.sort((a, b) => b - a);
}

console.log("part 1", part1(input));
console.log("part 2", part2(input)[0]);
