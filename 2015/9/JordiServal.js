const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n");

const parseInput = (input) => {
  return input.map((line) => {
    const [city1, to, city2, eq, distance] =line.split(" ");
    return { city1, city2, distance: parseInt(distance) };
  });
};

const getDistance = (city, cities, visited=[city], distance = 0) => {
  const keys = Object.keys(cities[city]);
  if (visited.length === keys.length) return distance

  const shortestDistance = keys.reduce((acc, key) => {
    if (visited.includes(key)) return acc
    const dist = getDistance(key, cities, [...visited, key]) + cities[city][key];
    return acc ? acc < dist ? acc : dist : dist
  }, false);
  
  return shortestDistance + distance
}

const shortestDistance = (map) => {
  const cities = {}
  map.forEach(({ city1, city2, distance }) => {
    if (!cities[city1]) cities[city1] = {};
    if (!cities[city2]) cities[city2] = {};
    cities[city1][city2] = distance;
    cities[city2][city1] = distance;
  });
  
  const distances = [];
  const citiesKeys = Object.keys(cities);

  citiesKeys.forEach(city => {
    distances.push(getDistance(city, cities))
  })

  console.log("distances", distances)
  return distances.reduce((acc, val) => acc < val ? acc : val)
};

const map = parseInput(input);

const part1 = shortestDistance(map);

const part2 = ""

console.log({ part1, part2 });