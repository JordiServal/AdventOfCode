use std::fs;
use std::ops::Add;

fn main() {
    let res_part_one = part_one();
    println!("Part one: {}", res_part_one);
    let res_part_two = part_two();
    println!("Part two: {}", res_part_two);
}

fn part_one() -> u32 {
    return sum_part_numbers(get_input());
}

fn sum_part_numbers(input_text: String) -> u32 {
    let mut part_numbers: Vec<u32> = Vec::new();
    let lines: Vec<&str> = input_text.lines().collect();
    for (index_line, line) in lines.clone().into_iter().enumerate() {
        let mut number = String::new();
        let mut has_character_valid = false;
        for (index_char, char) in line.chars().enumerate() {
            if char.is_digit(10) {
                number.push(char);
                let line_before_is_valid;
                let mut current_line_is_valid = false;
                let line_after_is_valid;
                let line_before: Vec<char>;
                let line_after: Vec<char>;
                if index_line > 0 {
                    line_before = get_line_before(lines.clone(), index_line, index_char);
                    line_before_is_valid = line_before
                        .iter()
                        .any(|char: &char| !char.is_digit(10) && char.ne(&'.'));
                } else {
                    line_before_is_valid = false;
                }
                if index_line < lines.len() - 1 {
                    line_after = get_line_after(lines.clone(), index_line, index_char);
                    line_after_is_valid = line_after
                        .iter()
                        .any(|char: &char| !char.is_digit(10) && char.ne(&'.'));
                } else {
                    line_after_is_valid = false;
                }
                let current_line_chars: Vec<char> = line.chars().collect();
                if index_char > 0 && index_char < line.len() - 1 {
                    current_line_is_valid = (!current_line_chars[index_char - 1].is_digit(10)
                        && current_line_chars[index_char - 1].ne(&'.'))
                        || (!current_line_chars[index_char + 1].is_digit(10)
                            && current_line_chars[index_char + 1].ne(&'.'));
                } else if index_char == 0 {
                    current_line_is_valid = !current_line_chars[index_char + 1].is_digit(10)
                        && current_line_chars[index_char + 1].ne(&'.');
                } else if index_char == line.len() - 1 {
                    current_line_is_valid = !current_line_chars[index_char - 1].is_digit(10)
                        && current_line_chars[index_char - 1].ne(&'.');
                }
                if line_before_is_valid || line_after_is_valid || current_line_is_valid {
                    has_character_valid = true;
                }
                if !number.is_empty() && has_character_valid && index_char == line.len() - 1 {
                    part_numbers.push(number.parse::<u32>().unwrap());
                    number = String::new();
                    has_character_valid = false;
                }
            } else {
                if !number.is_empty() && has_character_valid {
                    part_numbers.push(number.parse::<u32>().unwrap());
                } else if !number.is_empty() {
                    println!("Not valid: {:?}", number.parse::<u32>());
                }
                number = String::new();
                has_character_valid = false;
            }
        }
    }
    println!("{:?}", part_numbers);
    return part_numbers.iter().sum();
}

fn get_line_after(lines: Vec<&str>, index_line: usize, index_char: usize) -> Vec<char> {
    return if index_char > 0 && index_char < lines.first().unwrap().len() - 1 {
        lines[index_line + 1][index_char - 1..=index_char + 1]
            .chars()
            .collect()
    } else if index_char == 0 {
        lines[index_line + 1][index_char..=index_char + 1]
            .chars()
            .collect()
    } else {
        lines[index_line + 1][index_char - 1..=index_char]
            .chars()
            .collect()
    };
}

fn get_line_before(lines: Vec<&str>, index_line: usize, index_char: usize) -> Vec<char> {
    return if index_char > 0 && index_char < lines.first().unwrap().len() - 1 {
        lines[index_line - 1][index_char - 1..=index_char + 1]
            .chars()
            .collect()
    } else if index_char == 0 {
        lines[index_line - 1][index_char..=index_char + 1]
            .chars()
            .collect()
    } else {
        lines[index_line - 1][index_char - 1..=index_char]
            .chars()
            .collect()
    };
}

fn part_two() -> u32 {
    sum_gear_ratios(get_input())
}

fn sum_gear_ratios(input_text: String) -> u32 {
    let mut gear_ratios: Vec<u32> = Vec::new();
    let lines: Vec<&str> = input_text.lines().collect();
    for (index_line, line) in lines.clone().into_iter().enumerate() {
        let mut numbers: Vec<String> = Vec::new();
        for (index_char, char) in line.chars().enumerate() {
            if char.eq(&'*') {
                let current_line_chars: Vec<char> = line.chars().collect();
                if index_char > 0 && current_line_chars[index_char - 1].is_digit(10) {
                    numbers.push(get_number(current_line_chars.clone(), index_char - 1))
                }
                if index_char < line.len() - 1 && current_line_chars[index_char + 1].is_digit(10) {
                    numbers.push(get_number(current_line_chars.clone(), index_char + 1))
                }
                let line_before: Vec<char>;
                let line_after: Vec<char>;
                if index_line > 0 {
                    line_before = lines.clone()[index_line - 1].chars().collect();
                    if index_char > 0 && line_before[index_char - 1].is_digit(10) {
                        numbers.push(get_number(line_before.clone(), index_char - 1))
                    }
                    if !line_before[index_char - 1].is_digit(10)
                        && line_before[index_char].is_digit(10)
                    {
                        numbers.push(get_number(line_before.clone(), index_char))
                    }
                    if index_char < line.len() - 1
                        && line_before[index_char + 1].is_digit(10)
                        && !line_before[index_char].is_digit(10)
                    {
                        numbers.push(get_number(line_before.clone(), index_char + 1))
                    }
                }
                if index_line < lines.len() - 1 {
                    line_after = lines.clone()[index_line + 1].chars().collect();
                    if index_char > 0 && line_after[index_char - 1].is_digit(10) {
                        numbers.push(get_number(line_after.clone(), index_char - 1))
                    }
                    if !line_after[index_char - 1].is_digit(10)
                        && line_after[index_char].is_digit(10)
                    {
                        numbers.push(get_number(line_after.clone(), index_char))
                    }
                    if index_char < line.len() - 1
                        && line_after[index_char + 1].is_digit(10)
                        && !line_after[index_char].is_digit(10)
                    {
                        numbers.push(get_number(line_after.clone(), index_char + 1))
                    }
                }
                if numbers.len() == 2 {
                    println!("{:?}", numbers);
                    let number1: u32 = numbers[0].parse().unwrap();
                    let number2: u32 = numbers[1].parse().unwrap();
                    gear_ratios.push(number1 * number2);
                }
            }
            numbers = Vec::new();
        }
    }
    println!("{:?}", gear_ratios);
    return gear_ratios.iter().sum();
}

fn get_number(line: Vec<char>, position: usize) -> String {
    let mut number: String = String::new();
    number.push(line[position]);
    let mut position_forward = position + 1;
    while position_forward < line.len() && line[position_forward].is_digit(10) {
        number.push(line[position_forward]);
        position_forward = position_forward + 1;
    }
    if position == 0 {
        return number;
    }
    let mut position_backwards = position - 1;
    while position_backwards > 0 && line[position_backwards].is_digit(10) {
        let number_backup = number.clone();
        number = String::from(line[position_backwards]);
        number = number.clone().add(&*number_backup);
        position_backwards = position_backwards - 1;
    }
    if position_backwards == 0 && line[position_backwards].is_digit(10) {
        let number_backup = number.clone();
        number = String::from(line[position_backwards]);
        number = number.clone().add(&*number_backup);
    }
    return number;
}

fn get_input() -> String {
    let contents = fs::read_to_string("2023/03/input-pau.txt")
        .expect("Should have been able to read the file");
    contents
}
#[cfg(test)]
mod tests {
    use crate::sum_part_numbers;

    #[test]
    fn given_starting_no_part_number_when_sum_part_numbers_then_return_sum_with_starting_number() {
        let input_text = r#".................................................324.663............775...290=.301...............=...15........=....780..................562
747........................438...35...806*.......*......................................%396..508......*700...16..-..$..230....443..617.....
...*...$.........447......*...............336..424.........618........-..276......260............................452......#......*...*......"#;
        assert_eq!(7522, sum_part_numbers(input_text.to_string()))
    }

    #[test]
    fn test() {
        let input_text = r#"...733.......289..262.....520..................161.462..........450.........................183.............................................
....*....................*.............707.352....*............/.....................801...@...............333..196........484.635......287.
....42.........131....913..............*......&..........634..................440..&...............83.....@...........404$..=....*..423.*...
618.......272....*.........&......547.344...............#............689.589.*....150......382=................................168......433.
..........=...............253.102*.........#......78.......804..........*........................858.........................-.............."#;
        assert_eq!(11800, sum_part_numbers(input_text.to_string()))
    }
}
