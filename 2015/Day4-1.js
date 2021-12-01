import Md5 from 'https://cdn.skypack.dev/md5';


let input = "bgvyzdsv"
let hash = ""
let answer = 0

do {
  hash = Md5(input+answer)
  answer ++
} while(hash.indexOf('00000') !== 0)
  console.log(answer, hash)