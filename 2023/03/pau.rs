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
    let contents = get_input();
    return 0;
}

fn get_input() -> String {
    let contents =
        fs::read_to_string("02/input-pau.txt").expect("Should have been able to read the file");
    contents
}
#[cfg(test)]
mod tests {
    #[test]
    fn test() {
        assert_eq!(true, true)
    }
}
