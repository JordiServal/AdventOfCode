const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const ASCII_A = 97
const SIZE = 26

const increment = (chars, index) => {
  console.log(chars, index)
  chars[index] = chars[index] + 1;
  if (chars[index] === SIZE) {
    chars[index] = chars[index] % SIZE;
    return index  > 0 ? increment(chars, index - 1) : chars
  } 
  
  return chars
}

const newPassword = (input) => {
  const chars = input.split('').map(char => char.charCodeAt() - ASCII_A);
  console.log(chars)
  const newPass = increment(chars, chars.length - 1);
  console.log(newPass)

  return newPass.map(c => String.fromCharCode(c % ASCII_A + ASCII_A)).join('')
}

const part1 = newPassword(input);

const part2 = ''

console.log({ part1: part1, part2:  part2 });