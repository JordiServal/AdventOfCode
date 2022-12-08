const path = require("path");
const fs = require("fs");

let input = fs
  .readFileSync(path.join(__dirname, "inputManu.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
input.shift()

function totalizeSize(tree, size) {
  const path = [...tree.actualFolder]
  const pathLength = path.length
  for (let i = 0; i < pathLength - 1; i++) {
    path.pop()
    eval(`tree${path.join("")}`).totalSize += size
  }
  return tree
} 
let folders = input.reduce((tree, line) => {
  if (line.startsWith("$ ls") || line.startsWith("dir "))  return tree
  if (line.startsWith("$ cd")) {
    const folder = line.split(" ")[2]
    if (folder === "..") {
      tree.actualFolder.pop()
      return tree
    }else{
      eval(`tree${tree.actualFolder.join("")}`)[folder] = {
        totalSize: 0,
      }
      return {
        ...tree,
        actualFolder: [...tree.actualFolder, `["${folder}"]`]
      }
    }
  }
  
  eval(`tree${tree.actualFolder.join("")}`)[line.split(" ")[1]] = +line.split(" ")[0]
  eval(`tree${tree.actualFolder.join("")}`).totalSize += +line.split(" ")[0]
  tree = totalizeSize(tree, +line.split(" ")[0])
  return tree
}, { '/': { totalSize: 0 }, actualFolder: ['["/"]'] })

function getSize(tree) {
  let total = 0
  Object.values(tree).filter(value => {
    return typeof value === "object"
  }).forEach(folder => {
    if (folder.totalSize <= 100000) {
      total += folder.totalSize
      total += getSize(folder)
    } else {
      total += getSize(folder) 
    }
  })
  return total
}

function deleteFolder(tree, freeSpace) {
  const directories = []
  Object.values(tree).filter(value => {
    return typeof value === "object"
  }).forEach(folder => {
      if (folder.totalSize > freeSpace) {
        directories.push(folder.totalSize)
        directories.push(deleteFolder(folder, freeSpace))
      } 
    })
  
  return directories.flat().sort((a, b) => a - b)
}

const freeSpace = 30000000 - (70000000 - folders['/'].totalSize) 
console.log('part 1', getSize(folders['/']))
console.log('part 2', deleteFolder(folders['/'], freeSpace)[0])

