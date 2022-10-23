const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

const countLetters = (word) => {
  return {count: eval(word).length, w:word.length}
  
};

const countEscapedLetters = (word) => {
  let count = 2
  const array = word.trim().split("")
  
  array.forEach((letter, key) => {
    if(letter === '\\' || letter === '"')
      count += 2
    else 
      count += 1
  })

  return {normal: array.length, escaped: count}
};

const countWords = (input) => {
  let chars = 0;
  let letters = 0;
  input.forEach((word) => {
    const {count, w} = countLetters(word.trim());
    chars += count;
    letters += w;
  });
  return letters - chars;
};

const countEscapedWords = (input) => {
  let normalW = 0;
  let escapedW = 0;
  input.forEach((word) => {
    const {normal, escaped} = countEscapedLetters(word);
    normalW += normal;
    escapedW += escaped;
  });
  return escapedW - normalW;
};

const part1 = countWords(input);

const part2 = countEscapedWords(input);

console.log({ part1, part2 });