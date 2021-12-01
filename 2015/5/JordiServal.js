/**
 * --- Day 5: Doesn't He Have Intern-Elves For This? ---
Santa needs help figuring out which strings in his text file are naughty or nice.

A nice string is one with all of the following properties:

It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
For example:

ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.
aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.
jchzalrnumimnmhp is naughty because it has no double letter.
haegwjzuvuyypxyu is naughty because it contains the string xy.
dvszwmarrgswjxmb is naughty because it contains only one vowel.
How many strings are nice?
 */

const i2 = `ugknbfddgicrmopn
aaa
jchzalrnumimnmhp
haegwjzuvuyypxyu
dvszwmarrgswjxmb`

const arr = i2.split('\n')
let letterPair = []
let twice = false
let vowels = 0
let count = 0
const nonValidPair = ['ab', 'cd', 'pq', 'xy']
const vowel = 'aeiou'


arr.forEach((word) => {
  letterPair = []
  vowels = 0
  twice = false
  const arrWord = [...word]
  arrWord.forEach((letter) => {
    letterPair.push(letter)
    if(letterPair.length > 2) letterPair.shift()
      twice = letterPair.length === 2 && letterPair[0] === letterPair[1] || twice
    vowels += vowel.indexOf(letter) !== -1 ? 1 : 0
  }) 

  count += twice && !nonValidPair.some(pair => word.indexOf(pair) !== -1) && vowels >= 3
})

console.log(count)

/**
--- Part Two ---
Realizing the error of his ways, Santa has switched to a better model of determining whether a string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.

Now, a nice string is one with all of the following properties:

It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
For example:

qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).
xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.
uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.
ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.
How many strings are nice under these new rules?
 */

const arr = i2.split('\n')
let count = 0

const checkWord = (word) => {
  let letterPair = []
  let valid = false
  if(word.match(/([a-z]){1}([a-z])\1/g)) 
    [...word].forEach((letter, key) => {
      letterPair.push(letter)
      if(letterPair.length > 2) letterPair.shift()
      if(letterPair.length === 2) {
        if(!valid){
          const pair = letterPair.join('')
          const index = word.indexOf(pair)
          valid = index !== -1 && word.indexOf(pair, key + 1) !== -1
          
        }
      }
    }) 
    return valid
}

arr.forEach((word) => {
  count += checkWord(word)
})

console.log(count)