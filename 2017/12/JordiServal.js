const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()

const parse = (i) => i.split('\n').map(line => {
  let [id, pipes] = line.split(' <-> ')
  pipes = pipes.split(',').map(x => x.trim())
  return {id, pipes}
})

const getConnected = (current, connected, pipes) => {
  pipes[current].pipes.forEach(connection => {
    if(!connected[connection]) {
      connected[connection] = 1
      connected = {... connected, ...getConnected(connection, connected, pipes)}
    }
  });
  return connected
}

const countConnectedPipes = (pipes) => {
  let connected = {'0': 1}
  return Object.keys(getConnected('0', connected, pipes)).length
}

const countConnectedGroups = pipes => {
  let connected = {}, groups = 0
  pipes.forEach(pipe => {
    if(!connected[pipe.id]) {
      connected[pipe.id] = 1
      groups ++
      connected = getConnected(pipe.id, connected, pipes)
    }
  })
  return groups
}

const part1 = countConnectedPipes(parse(input))
const part2 = countConnectedGroups(parse(input))
console.log({part1, part2})       