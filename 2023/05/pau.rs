use std::fs;

fn main() {
    let res_part_one = part_one();
    println!("Part one: {}", res_part_one);
    let res_part_two = part_two();
    println!("Part two: {}", res_part_two);
}

fn part_one() -> u32 {
    let contents = get_input();
    return 0;
}

fn part_two() -> u32 {
    let input_text = get_input();
    let seeds: Vec<u32> = get_seeds(input_text);
    println!("{:?}", seeds);
    return 0;
}

fn get_seeds(input_text: String) -> Vec<u32> {
    let line = input_text.lines().next().unwrap();
    return line.split(':').collect::<Vec<&str>>()[1]
        .split_whitespace()
        .collect::<Vec<&str>>()
        .to_vec()
        .into_iter()
        .map(|number_string: &str| number_string.parse().unwrap())
        .collect();
}

fn get_input() -> String {
    let contents =
        fs::read_to_string("05/input-pau.txt").expect("Should have been able to read the file");
    contents
}
#[cfg(test)]
mod tests {
    #[test]
    fn test() {
        assert_eq!(true, true)
    }
}
