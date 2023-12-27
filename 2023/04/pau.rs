use std::fs;

fn main() {
    let res_part_one = part_one();
    println!("Part one: {}", res_part_one);
    let res_part_two = part_two();
    println!("Part two: {}", res_part_two);
}

fn part_one() -> u32 {
    let input_text = get_input();
    let lines: Vec<&str> = input_text.lines().collect();
    let mut total_points = 0;
    let mut coincidences;
    for line in lines {
        let numbers = line.split(':').collect::<Vec<&str>>()[1];
        let winning_numbers: Vec<u32> = get_winning_numbers(numbers);
        let personal_numbers: Vec<u32> = get_personal_numbers(numbers);
        coincidences = get_coincidences(winning_numbers, personal_numbers);
        if coincidences != 0 {
            total_points = total_points + (1 << coincidences - 1);
        }
    }
    return total_points;
}

fn part_two() -> u32 {
    let input_text = get_input();
    let lines: Vec<&str> = input_text.lines().collect();
    let mut coincidences: Vec<u32> = Vec::new();
    let mut copies: [u32; 198] = [1; 198];
    for (index, line) in lines.iter().enumerate() {
        let numbers = line.split(':').collect::<Vec<&str>>()[1];
        let winning_numbers: Vec<u32> = get_winning_numbers(numbers);
        let personal_numbers: Vec<u32> = get_personal_numbers(numbers);
        let matches = get_coincidences(winning_numbers, personal_numbers);
        coincidences.push(matches);
        let mut counter = index + 1;
        while counter - index - 1 < matches as usize {
            copies[counter] = copies[counter] + (1 * copies[index]);
            counter += 1;
        }
    }
    return copies.iter().sum();
}

fn get_coincidences(winning_numbers: Vec<u32>, personal_numbers: Vec<u32>) -> u32 {
    let mut total = 0;
    for personal_number in personal_numbers {
        if winning_numbers.contains(&personal_number) {
            total = total + 1;
        }
    }
    return total;
}

fn get_winning_numbers(numbers: &str) -> Vec<u32> {
    let winning_numbers_string = numbers.split('|').collect::<Vec<&str>>()[0];
    let winning_numbers_list = winning_numbers_string
        .split_whitespace()
        .collect::<Vec<&str>>();
    return winning_numbers_list
        .to_vec()
        .into_iter()
        .map(|number_string: &str| number_string.parse().unwrap())
        .collect();
}

fn get_personal_numbers(numbers: &str) -> Vec<u32> {
    let winning_numbers_string = numbers.split('|').collect::<Vec<&str>>()[1];
    let winning_numbers_list = winning_numbers_string
        .split_whitespace()
        .collect::<Vec<&str>>();
    return winning_numbers_list
        .to_vec()
        .into_iter()
        .map(|number_string: &str| number_string.parse().unwrap())
        .collect();
}

fn get_input() -> String {
    let contents = fs::read_to_string("2023/04/input-pau.txt")
        .expect("Should have been able to read the file");
    contents
}
#[cfg(test)]
mod tests {
    #[test]
    fn test() {
        assert_eq!(true, true)
    }
}
