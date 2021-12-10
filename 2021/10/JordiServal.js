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
  
  const getFinishedLines = (i) => {
    let linesScores = i.reduce((autoCompleteLines, line) => {
      const pairsLeft = line.split('').reduce((currentLine, char) => {
        if(currentLine !== false) {
          if(!closing.includes(char)) {
            currentLine.push(char)
          } else {
            const initChar = currentLine.pop()
            if(initChar === '(' && char !== ')' ||
              initChar === '[' && char !== ']' ||
              initChar === '{' && char !== '}' ||
              initChar === '<' && char !== '>') return false
          }
        }
        return currentLine
      }, [])
      if(pairsLeft !== false) {
        const lineScore = pairsLeft.reverse().reduce((score, char) => {
          return score * 5 + (char === '(' ? 1 : char === '[' ? 2 : char === '{' ? 3 : char === '<' ? 4 : 0)
        }, 0)
        autoCompleteLines.push(lineScore)
      }
      return autoCompleteLines 
    }, [])
    return linesScores.sort((a, b) => a-b)[Math.floor(linesScores.length / 2)]
  }
  
  console.log("Corrupted lines:", getCorruptedIndex(input.split('\n')))
  console.log("Finish lines:", getFinishedLines(input.split('\n')))
  
  