use std::fs;

fn main() {
    let res_part_one = part_one();
    println!("Part one: {}", res_part_one);
    let res_part_two = part_two();
    println!("Part two: {}", res_part_two);
}

fn part_one() -> u32 {
    let contents =
        fs::read_to_string("01/input-pau.txt").expect("Should have been able to read the file");
    let res = contents
        .lines()
        .filter_map(|line| get_line_calibration_number(line))
        .sum::<u32>();
    return res;
}

fn part_two() -> u32 {
    let contents =
        fs::read_to_string("01/input-pau.txt").expect("Should have been able to read the file");
    let res = contents
        .lines()
        .filter_map(|line| {
            println!("Line: {}", line);
            return map_text_to_number(line);
        })
        .filter_map(|line| {
            let calibration_number = get_line_calibration_number(line.as_str());
            println!("Calibration number: {:?}", calibration_number);
            return calibration_number;
        })
        .sum::<u32>();
    return res;
}

fn get_line_calibration_number(line_text: &str) -> Option<u32> {
    let numbers: Vec<char> = line_text.chars().filter(|char| char.is_digit(10)).collect();
    return if numbers.first().is_some() && numbers.last().is_some() {
        format!("{}{}", numbers.first().unwrap(), numbers.last().unwrap())
            .parse()
            .ok()
    } else {
        Some(0)
    };
}

fn map_text_to_number(line_text: &str) -> Option<String> {
    let numbers = vec![
        "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4",
        "5", "6", "7", "8", "9",
    ];
    let mut occurrences = Vec::new();
    for number in numbers.iter().copied() {
        let number_occurrences: Vec<_> = line_text.match_indices(number).collect();
        for occurrence in number_occurrences {
            occurrences.push(occurrence);
        }
    }
    occurrences.sort_by(|(index_one, _), (index_two, _)| index_one.cmp(index_two));
    return occurrences
        .iter()
        .copied()
        .map(|(_, value)| value)
        .map(|value| {
            numbers
                .iter()
                .position(|element| element.trim().eq(value))
                .map(|position| {
                    return if position > 8 { position - 9 } else { position };
                })
                .unwrap()
                + 1
        })
        .map(|number| number.to_string())
        .reduce(|first, second| first + second.as_str());
}

#[cfg(test)]
mod tests {
    use super::get_line_calibration_number;
    use super::map_text_to_number;

    #[test]
    fn given_line_with_two_numbers_when_get_line_number_then_return_concat_of_numbers() {
        assert_eq!(
            get_line_calibration_number("glckqhjsbsznseight5dtnxnsix7"),
            Some(57)
        );
    }

    #[test]
    fn given_line_with_one_number_when_get_line_number_then_return_number_two_times() {
        assert_eq!(
            get_line_calibration_number("glckqhjsbsznseight3dtnxnsix"),
            Some(33)
        );
    }

    #[test]
    fn given_line_with_multiple_numbers_when_get_line_number_then_return_first_and_last() {
        assert_eq!(
            get_line_calibration_number("qfrpksmzzvfkddtfh6138"),
            Some(68)
        );
    }

    #[test]
    fn given_line_with_only_numbers_when_get_line_number_then_return_first_and_last() {
        assert_eq!(
            get_line_calibration_number("76766746743119203910"),
            Some(70)
        );
    }

    #[test]
    fn given_line_with_multiple_spelled_numbers_when_map_text_to_number_then_return_spelled_as_numbers(
    ) {
        assert_eq!(map_text_to_number("four9one"), Some(String::from("491")));
    }

    #[test]
    fn given_line_with_some_no_matching_spelled_numbers_when_map_text_to_number_then_return_spelled_as_numbers(
    ) {
        assert_eq!(
            map_text_to_number("one3dffdfxwf4"),
            Some(String::from("134"))
        );
    }

    #[test]
    fn given_line_with_two_overlapping_spelled_numbers_when_map_text_to_number_then_return_spelled_as_numbers(
    ) {
        assert_eq!(
            map_text_to_number("gfhfgh3twone"),
            Some(String::from("321"))
        );
    }

    #[test]
    fn given_line_with_repeated_spelled_numbers_when_map_text_to_number_then_include_repeated_two_times(
    ) {
        assert_eq!(
            map_text_to_number("sixtwo9tqpqg1fourtwo"),
            Some(String::from("629142"))
        );
    }

    #[test]
    fn given_line_with_last_index_num_when_map_text_to_number_then_include_last_number() {
        assert_eq!(
            map_text_to_number("17gkhhffc3oneeight597"),
            Some(String::from("17318597"))
        );
    }

    #[test]
    fn given_line_with_no_numbers_when_map_text_to_number_then_return_none() {
        assert_eq!(map_text_to_number("gdgdfggdfggg"), None);
    }
}
