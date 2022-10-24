const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

const parseInput = (input) => {
  const cities = {}
  input.forEach((line) => {
    const [city1, to, city2, eq, distance] =line.split(" ");
    if (!cities[city1]) cities[city1] = {};
    if (!cities[city2]) cities[city2] = {};
    cities[city1][city2] = parseInt(distance);
    cities[city2][city1] = parseInt(distance);
  });
  return cities
};

const getShortDistance = (city, cities, visited=[city], distance = 0) => {
  const keys = Object.keys(cities[city]);
  if (visited.length > keys.length) return distance
  
  const shortestDistance = keys.reduce((acc, key) => {
    if (visited.includes(key)) return acc
    const dist = getShortDistance(key, cities, [...visited, key], distance + cities[city][key]);
    return acc === false ? dist : acc < dist ? acc : dist
  }, false);
  
  // console.log(city, visited, shortestDistance)
  return shortestDistance
}

const getLongDistance = (city, cities, visited=[city], distance = 0) => {
  const keys = Object.keys(cities[city]);
  if (visited.length > keys.length) return distance
  
  const shortestDistance = keys.reduce((acc, key) => {
    if (visited.includes(key)) return acc
    const dist = getLongDistance(key, cities, [...visited, key], distance + cities[city][key]);
    return acc === false ? dist : acc > dist ? acc : dist
  }, false);
  
  return shortestDistance
}

const shortestDistance = (cities) => {
  console.log(cities)
  const citiesKeys = Object.keys(cities);

  return citiesKeys.reduce((acc, city) => {
    const dist = getShortDistance(city, cities)
    return !acc ? dist : acc < dist ? acc : dist 
  }, false)
};
const longestDistance = (cities) => {
  console.log(cities)
  const citiesKeys = Object.keys(cities);

  return citiesKeys.reduce((acc, city) => {
    const dist = getLongDistance(city, cities)
    return !acc ? dist : acc > dist ? acc : dist 
  }, false)
};



const cities = parseInput(input);

const part1 = shortestDistance(cities);

const part2 = longestDistance(cities);

console.log({ part1, part2 });