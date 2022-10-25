const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const ASCII_A = 'a'.charCodeAt();
const SIZE = 26
const FORBIDDEN_CHARS = [
  'i'.charCodeAt(), 
  'o'.charCodeAt(), 
  'l'.charCodeAt()
].map(c => c - ASCII_A)

const increment = (chars, index) => {
  chars[index] = chars[index] + 1;
  if (chars[index] === SIZE) {
    chars[index] = chars[index] % SIZE;
    return index  > 0 ? increment(chars, index - 1) : chars
  } 
  
  return chars
}

const checkPassword = (password) => {
  const straight = password.reduce((acc, char) => {
    if (acc.completed) return acc
    if (char === acc.last+1) {
      if (acc.count === 2) return {count: 1, last: char, completed: true}
      return {count: acc.count + 1, last: char, completed: false}
    }
    return {count: 1, last: char, completed: false}
  }, {count: 1, last: password[0], completed: false}).completed
  
  const forbidden = !password.some(char => FORBIDDEN_CHARS.includes(char))
  
  const pairs = password.reduce((acc, char) => {
    if (char === acc.last) {
      return {count: acc.count + 1, last: ''}
    }
    return {count: acc.count, last: char}
  }, {count: 0, last: ''}).count >= 2

  return straight && forbidden && pairs && password.length === 8
}

const newPassword = (input) => {
  const chars = input.split('').map(char => char.charCodeAt() - ASCII_A)
  let newPass = []
  do {
    newPass = increment(chars, chars.length - 1);
  } while (!checkPassword(newPass))
  
  return newPass.map(c => String.fromCharCode(c % ASCII_A + ASCII_A)).join('')
}

const part1 = newPassword(input);

const part2 = newPassword(part1);

console.log({ part1: part1, part2:  part2 });