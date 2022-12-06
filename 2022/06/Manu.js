const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "inputManu.txt"), "utf8")
  .toString()
  .trim()
  .split("")

function hasRepeats (str) {
    return /(.).*\1/.test(str);
}

const MAX_SIGNAL_LENGTH = 14; // 4 for part 1, 14 for part 2

const firstMarker = input.reduce((acc, curr, index) => {
  if (acc.signal.length === MAX_SIGNAL_LENGTH) {
    acc = {
      ...acc,
      signal: acc.signal.slice(1),
    } 
  } 
  
  acc = {
    ...acc,
    signal: acc.signal.concat(curr),
  }
  
  if (acc.signal.length !== MAX_SIGNAL_LENGTH) return acc;
  
  // get Reapeated letter
  const isRepeated = hasRepeats(acc.signal);
  if (!isRepeated) {
    acc.marker = index + 1;
    input.splice(1) // Force exit of reduce
  }
  return acc;
}, {
    signal: "",
    marker: 0
  });

console.log(firstMarker)
