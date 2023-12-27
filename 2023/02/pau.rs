use std::fs;

fn main() {
    let res_part_one = part_one();
    println!("Part one: {}", res_part_one);
    let res_part_two = part_two();
    println!("Part two: {}", res_part_two);
}

fn part_one() -> usize {
    let contents = get_input();
    return contents
        .lines()
        .enumerate()
        .filter(|(_, line_text)| is_valid_game(line_text))
        .map(|(index, _)| return index + 1)
        .sum::<usize>();
}

fn is_valid_game(line_text: &str) -> bool {
    let game_data = get_game_data(line_text);
    return game_data
        .unwrap()
        .split(';')
        .all(|round| is_valid_round(round));
}

fn get_game_data(line_text: &str) -> Option<&str> {
    line_text.split(':').last()
}

fn is_valid_round(round_text: &str) -> bool {
    return round_text.split(';').all(|colors_set| {
        return is_valid_set(colors_set);
    });
}

fn is_valid_set(colors_set: &str) -> bool {
    colors_set.split(',').all(|color_set| {
        let colors: Vec<(u32, &str)> = vec![(12, "red"), (13, "green"), (14, "blue")];
        return colors.iter().any(|(max_items, color)| {
            let mut is_valid = false;
            if color_set.to_string().contains(color) {
                // here i'm reusing the same thing i did in the first day using is_number to get the number :D
                let number: u32 = color_set
                    .chars()
                    .filter(|char| char.is_digit(10))
                    .into_iter()
                    .collect::<String>()
                    .parse()
                    .ok()
                    .unwrap();
                is_valid = number <= *max_items;
            }
            return is_valid;
        });
    })
}

fn get_input() -> String {
    let contents = fs::read_to_string("2023/02/input-pau.txt")
        .expect("Should have been able to read the file");
    contents
}

fn part_two() -> u32 {
    let contents = get_input();
    return contents
        .lines()
        .map(|line_text| get_power_game(line_text))
        .sum::<u32>();
}

fn get_power_game(line_text: &str) -> u32 {
    let game_data = get_game_data(line_text);
    let sets: Vec<&str> = game_data.unwrap().split(|c| c == ',' || c == ';').collect();
    let colors: Vec<&str> = vec!["red", "green", "blue"];
    println!("baby hello1");
    return colors
        .iter()
        .copied()
        .map(|color| {
            let same_color_sets: Vec<&str> = sets
                .iter()
                .filter(move |set| set.to_owned().contains(color))
                .map(|set| set.to_owned())
                .collect();
            return same_color_sets
                .iter()
                .to_owned()
                .map(|set| {
                    set.chars()
                        .filter(|char| char.is_digit(10))
                        .collect::<String>()
                })
                .map(|set| set.parse::<u32>().ok().unwrap())
                .max()
                .unwrap();
        })
        .reduce(|first, second| first * second)
        .unwrap();
}

#[cfg(test)]
mod tests {
    use super::{get_power_game, is_valid_game};

    #[test]
    fn given_valid_input_when_check_is_valid_then_return_true() {
        assert_eq!(
            true,
            is_valid_game("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")
        )
    }

    #[test]
    fn given_non_valid_red_input_when_check_is_valid_then_return_false() {
        assert_eq!(
            false,
            is_valid_game(
                "Game 4: 1 green, 13 red, 6 blue; 3 green, 6 red; 3 green, 11 blue, 11 red"
            )
        )
    }

    #[test]
    fn given_non_valid_green_input_when_check_is_valid_then_return_false() {
        assert_eq!(
            false,
            is_valid_game(
                "Game 4: 1 green, 3 red, 6 blue; 14 green, 6 red; 3 green, 11 blue, 11 red"
            )
        )
    }

    #[test]
    fn given_non_valid_blue_input_when_check_is_valid_then_return_false() {
        assert_eq!(
            false,
            is_valid_game(
                "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 11 red"
            )
        )
    }

    #[test]
    fn given_non_valid_blue_input_when_get_power_game_then_return_power() {
        assert_eq!(
            495,
            get_power_game(
                "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 11 red"
            )
        )
    }
}
