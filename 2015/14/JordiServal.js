const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")

const parseInput = (input) => {
  return input.reduce((acc, line) => {
    const split =line.split(" ");
    return {...acc, [split[0]]: {
      name: split[0],
      speed: parseInt(split[3]),
      speedTime: parseInt(split[6]),
      restTime: parseInt(split[13]),
      points: 0,
      distance: 0,
      leftSpeedTime: parseInt(split[6]),
      leftRestTime: parseInt(split[13]),
    }}
  }, {})
}

const reindeerOlympics = (reindeers, time, winCondition) => {
  let values = Object.values(reindeers)
  for(let t=0; t<=time; t++) {
    values = values.map(reindeer => {
      if(reindeer.leftSpeedTime > 0) {
        reindeer.distance += reindeer.speed
        reindeer.leftSpeedTime--
      } else if (reindeer.leftRestTime > 0) {
        reindeer.leftRestTime--
      } else {
        reindeer.leftSpeedTime = reindeer.speedTime
        reindeer.leftRestTime = reindeer.restTime
        reindeer.distance += reindeer.speed
        reindeer.leftSpeedTime--
      }
      return reindeer
    })
    const maxDistance = values.reduce((acc, reindeer) => acc !== false ? acc > reindeer.distance ? acc : reindeer.distance : reindeer.distance, false)
    values = values.map(reindeer => reindeer.distance === maxDistance ? {...reindeer, points: reindeer.points + 1} : reindeer)
  }
  return values.reduce((acc, reindeer) => acc === false ? reindeer[winCondition] : acc > reindeer[winCondition] ? acc : reindeer[winCondition]
  , false)
}

const time = 2503

const part1 = reindeerOlympics(parseInput(input), time, 'distance')

const part2 = reindeerOlympics(parseInput(input), time, 'points')

console.log({ part1, part2 });