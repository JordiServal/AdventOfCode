const input = `[({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]`
  
  const closing = ")]}>"
  const opening = "([{<"
  
  const getCorruptedIndex = (i) => {
    return i.reduce((corruptAcc, line) => {
      let currentLine = []
      const corruptChar = line.split('').find((char) => {
        if(!closing.includes(char)) {
          currentLine.push(char)
        } else {
          const initChar = currentLine.pop()
          if(initChar === '(' && char !== ')' ||
            initChar === '[' && char !== ']' ||
            initChar === '{' && char !== '}' ||
            initChar === '<' && char !== '>') return true
        }
        return false
      }, 0)
      return corruptAcc + (corruptChar === ')' ? 3 : corruptChar === ']' ? 57 : corruptChar === '}' ? 1197 : corruptChar === '>' ? 25137 : 0)
    }, 0)
  }
  
  console.log("Corrupted lines:", getCorruptedIndex(input.split('\n')))