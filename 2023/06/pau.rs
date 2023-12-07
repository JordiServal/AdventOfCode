use std::fs;

fn main() {
    let res_part_one = part_one();
    println!("Part one: {}", res_part_one);
    let res_part_two = part_two();
    println!("Part two: {}", res_part_two);
}

fn part_one() -> u128 {
    let input_text = get_input();
    let times: Vec<u128> = get_times(input_text.clone());
    println!("{:?}", times);
    let distances: Vec<u128> = get_distances(input_text.clone());
    println!("{:?}", distances);
    let mut possible_ways: Vec<u128> = Vec::new();
    for (index, time) in times.iter().enumerate() {
        possible_ways.push(get_possible_ways(
            time.to_owned(),
            distances[index].to_owned(),
        ));
    }
    println!("{:?}", possible_ways);
    return possible_ways.iter().fold(1, |a, b| a * b);
}

fn get_possible_ways(time: u128, distance: u128) -> u128 {
    let mut victories = 0;
    for time_pressing in 1..time {
        let res = (time - time_pressing) * time_pressing;
        if res > distance {
            victories += 1;
        }
    }
    return victories;
}

fn get_times(input_text: String) -> Vec<u128> {
    input_text
        .lines()
        .into_iter()
        .next()
        .unwrap()
        .split(':')
        .collect::<Vec<&str>>()[1]
        .to_string()
        .split_whitespace()
        .collect::<Vec<&str>>()
        .to_vec()
        .into_iter()
        .map(|number_string: &str| number_string.parse().unwrap())
        .collect()
}

fn get_distances(input_text: String) -> Vec<u128> {
    input_text
        .lines()
        .into_iter()
        .next_back()
        .unwrap()
        .split(':')
        .collect::<Vec<&str>>()[1]
        .to_string()
        .split_whitespace()
        .collect::<Vec<&str>>()
        .to_vec()
        .into_iter()
        .map(|number_string: &str| number_string.parse().unwrap())
        .collect()
}

fn part_two() -> f64 {
    let contents = get_input();
    return 0.0;
}

fn get_input() -> String {
    let contents =
        fs::read_to_string("06/input-pau.txt").expect("Should have been able to read the file");
    contents
}

#[cfg(test)]
mod tests {
    #[test]
    fn test() {
        assert_eq!(true, true)
    }
}
