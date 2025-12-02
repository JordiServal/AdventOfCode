const demo = `
11-22
95-115
998-1012
1188511880-1188511890
222220-222224
1698522-1698528
446443-446449
38593856-38593862
565653-565659
824824821-824824827
2121212118-2121212124
`
const inputString = `
8123221734-8123333968
2665-4538
189952-274622
4975-9031
24163352-24202932
1233-1772
9898889349-9899037441
2-15
2147801-2281579
296141-327417
8989846734-8989940664
31172-42921
593312-632035
862987-983007
613600462-613621897
81807088-81833878
13258610-13489867
643517-782886
986483-1022745
113493-167913
10677-16867
372-518
3489007333-3489264175
1858-2534
18547-26982
16-29
247-366
55547-103861
57-74
30-56
1670594-1765773
76-129
134085905-134182567
441436-566415
7539123416-7539252430
668-1146
581563513-581619699
`

const input = inputString.split('\n').map(line => line.trim()).filter(line => line.length > 0)

// Part One
const ranges = input.map(line => {
    const [firstId, lastId] = line.split('-').map(s => s.trim()).map(Number)
    return { firstId, lastId }
})

const partOne = () => {
    const TWICE_NUMBERS_REGEX = /^(\d+)\1$/g;

    let total = 0;
    ranges.forEach(range => {
        for(let n = range.firstId; n <= range.lastId; n++) {
            if(TWICE_NUMBERS_REGEX.test(n.toString())) {
                total += n;
            }
        }
    })

    return total;
}

// Result
console.time("Part One");
console.log('Part One', partOne())
console.timeEnd("Part One");

// ------------------------------------------------
// ------------------------------------------------
// ------------------------------------------------
// Part Two
const partTwo = () => {
    const REPEAT_TWICE_NUMBERS_REGEX = /^(\d+)\1+$/g;

    let total = 0;
    ranges.forEach(range => {
        for(let n = range.firstId; n <= range.lastId; n++) {
            if(REPEAT_TWICE_NUMBERS_REGEX.test(n.toString())) {
                total += n;
            }
        }
    })

    return total;
}

// Result
console.time("Part Two");
console.log('Part Two', partTwo())
console.timeEnd("Part Two");
