const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")


const combinations = (set, k) => {
  var i, j, combs, head, tailcombs;
  if (k > set.length || k <= 0) {
    return [];
  }
  if (k == set.length) {
    return [set];
  }
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i+1);
    tailcombs = combinations(set.slice(i + 1), k - 1);
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}


const parseInput = (input) => {
  return input.map((line) => {
    const split =line.split(" ");
    return {
      name: split[0],
      capacity: parseInt(split[2]),
      durability: parseInt(split[4]),
      flavor: parseInt(split[6]),
      texture: parseInt(split[8]),
      calories: parseInt(split[10]),
    }
  })
}

const highestScore = (ingredients, teaspoons, calories = 0) => {
  teaspoons = new Array(teaspoons + ingredients.length -1).fill(0).map((_, i) => i)
  return combinations(teaspoons, ingredients.length-1).reduce((acc, combination, index, combinations) => {
    const spoons = combination.reduce((acc, comb, i) => {
      if(i === 0) {
        acc.push(comb)
      } else {
        acc.push(comb - combination[i-1] - 1)
      }
      if(i === ingredients.length-2) {
        acc.push(teaspoons.length - comb -1) 
      } 
      return acc
    }, [])
    const scoreObj = spoons.reduce((acc, spoon, i) => {
      const ingredient = ingredients[i]
      acc.capacity += spoon * ingredient.capacity
      acc.durability += spoon * ingredient.durability
      acc.flavor += spoon * ingredient.flavor
      acc.texture += spoon * ingredient.texture
      acc.calories += spoon * ingredient.calories
      return acc
    }, {capacity: 0, durability: 0, flavor: 0, texture: 0, calories: 0})
    const values = Object.values(scoreObj)
    const currentCalories = values.pop()
    let score = values.reduce((acc, value) => acc * (value > 0 ? value : 0), 1)
    if(calories > 0 && calories !== currentCalories) 
      score = 0
    // console.log(score, spoons)
    return acc > score ? acc : score
  }, 0)
}

const ingredients = parseInput(input)

const part1 = highestScore(ingredients, 100)

const part2 = highestScore(ingredients, 100, 500)

console.log({ part1, part2 });