const input = `1,1,1,1,1,5,1,1,1,5,1,1,3,1,5,1,4,1,5,1,2,5,1,1,1,1,3,1,4,5,1,1,2,1,1,1,2,4,3,2,1,1,2,1,5,4,4,1,4,1,1,1,4,1,3,1,1,1,2,1,1,1,1,1,1,1,5,4,4,2,4,5,2,1,5,3,1,3,3,1,1,5,4,1,1,3,5,1,1,1,4,4,2,4,1,1,4,1,1,2,1,1,1,2,1,5,2,5,1,1,1,4,1,2,1,1,1,2,2,1,3,1,4,4,1,1,3,1,4,1,1,1,2,5,5,1,4,1,4,4,1,4,1,2,4,1,1,4,1,3,4,4,1,1,5,3,1,1,5,1,3,4,2,1,3,1,3,1,1,1,1,1,1,1,1,1,4,5,1,1,1,1,3,1,1,5,1,1,4,1,1,3,1,1,5,2,1,4,4,1,4,1,2,1,1,1,1,2,1,4,1,1,2,5,1,4,4,1,1,1,4,1,1,1,5,3,1,4,1,4,1,1,3,5,3,5,5,5,1,5,1,1,1,1,1,1,1,1,2,3,3,3,3,4,2,1,1,4,5,3,1,1,5,5,1,1,2,1,4,1,3,5,1,1,1,5,2,2,1,4,2,1,1,4,1,3,1,1,1,3,1,5,1,5,1,1,4,1,2,1`
//const input = `3,4,3,1,2`
let days = 80

// Part One
let lanternfish = input.split(',').map(Number)
let calendar = []
calendar.push(lanternfish)

const calculateDay = (yesterday) => {
    let today = [...yesterday]
    today.forEach((value, index) => {
        if(value === 0) {
            today[index] = 6
            today.push(8)
        } else {
            today[index] = value - 1
        }
    })
    return today
}

for(let i = 0; i < days; i++) {
    const yesterday = calendar[calendar.length - 1]
    const today = calculateDay(yesterday)
    calendar.push(today)
}

let lastDay = calendar[calendar.length - 1]

// Result
console.log(`Part One - lanternfish after ${days} days`, lastDay.length)

// ------------------------------------------------
// ------------------------------------------------
// ------------------------------------------------
// Part Two
days = 256

const ages = Array(9).fill(0)
for(let day of lanternfish) {
    ages[day]++
}

for(let i = 0; i < days; i++) {
    let sixFish = 0
    let eightFish = 0

    for(let age = 0; age < ages.length; age++) {
        const countAge = ages[age]
        if(age === 0) {
            sixFish = countAge
            eightFish = countAge
        } else if(age - 1 >= 0) {
            ages[age - 1] = countAge
        }
    }
    
    ages[6] += sixFish
    ages[8] = eightFish
}

// Result
console.log(`Part Two - lanternfish after ${days} days`, ages.reduce((a, b) => a + b))
