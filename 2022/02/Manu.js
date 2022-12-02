const path = require("path");
const fs = require("fs");

const data = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
/*
  X -> piedra = 1
  Y -> papel = 2
  Z -> tijera = 3
*/
const rules = {
  "AX": 4, // empate
  "AY": 8, // gano
  "AZ": 3, // pierdo
  
  "BX": 1, // pierdo
  "BY": 5, // empate
  "BZ": 9, // gano
  
  "CX": 7, // gano
  "CY": 2, // pierdo
  "CZ": 6, // empate
}

const rules2 = {
  "AX": 3,
  "AY": 4,
  "AZ": 8,
  
  "BX": 1,
  "BY": 5,
  "BZ": 9,
  
  "CX": 2, 
  "CY": 6, 
  "CZ": 7, 
}

const getWinner = data.reduce((acc, curr) => {
  const [a, b] = curr.split(" ");
  const key = `${a}${b}`;
  const value = rules2[key];

  return acc + value;
}, 0)

console.log(getWinner);
