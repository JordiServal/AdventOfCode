use std::{cmp::min, fs};

fn main() {
    let res_part_one = part_one();
    println!("Part one: {}", res_part_one);
    let res_part_two = part_two();
    println!("Part two: {}", res_part_two);
}

fn part_two() -> i128 {
    let input_text = get_input();
    let seeds: Vec<i128> = get_seeds_part_two(input_text.clone());
    let line = input_text.lines().next().unwrap();
    let mut seeds: Vec<i128> = Vec::new();
    let mut min_location: i128 = 0;
    let original_seeds: Vec<i128> = line.split(':').collect::<Vec<&str>>()[1]
        .split_whitespace()
        .collect::<Vec<&str>>()
        .to_vec()
        .into_iter()
        .map(|number_string: &str| number_string.parse().unwrap())
        .collect();
    for (index, original_seed) in original_seeds.iter().enumerate() {
        if index % 2 == 0 {
            let end_value = original_seeds[index + 1];
            for seed in *original_seed..(original_seed + end_value) {
                let soil = get_mapping(seed, input_text.clone(), Mapping::SeedToSoil);
                let fertilizer = get_mapping(soil, input_text.clone(), Mapping::SoilToFertilizer);
                let water = get_mapping(fertilizer, input_text.clone(), Mapping::FertilizerToWater);
                let light = get_mapping(water, input_text.clone(), Mapping::WaterToLight);
                let temperature =
                    get_mapping(light, input_text.clone(), Mapping::LightToTemperature);
                let humidity = get_mapping(
                    temperature,
                    input_text.clone(),
                    Mapping::TemperatureToHumidity,
                );
                min_location = min(
                    min_location,
                    get_mapping(humidity, input_text.clone(), Mapping::HumidityToLocation),
                );
            }
        }
    }
    return min_location;
}

fn part_one() -> i128 {
    let input_text = get_input();
    let seeds: Vec<i128> = get_seeds(input_text.clone());
    let mut locations: Vec<i128> = Vec::new();
    for seed in seeds.clone() {
        let soil = get_mapping(seed, input_text.clone(), Mapping::SeedToSoil);
        let fertilizer = get_mapping(soil, input_text.clone(), Mapping::SoilToFertilizer);
        let water = get_mapping(fertilizer, input_text.clone(), Mapping::FertilizerToWater);
        let light = get_mapping(water, input_text.clone(), Mapping::WaterToLight);
        let temperature = get_mapping(light, input_text.clone(), Mapping::LightToTemperature);
        let humidity = get_mapping(
            temperature,
            input_text.clone(),
            Mapping::TemperatureToHumidity,
        );
        locations.push(get_mapping(
            humidity,
            input_text.clone(),
            Mapping::HumidityToLocation,
        ));
    }
    println!("{:?}", seeds);
    println!("{:?}", locations);
    return locations.iter().min().unwrap().to_owned();
}

enum Mapping {
    SeedToSoil,
    SoilToFertilizer,
    FertilizerToWater,
    WaterToLight,
    LightToTemperature,
    TemperatureToHumidity,
    HumidityToLocation,
}

impl Mapping {
    fn value(&self) -> &'static str {
        match self {
            Mapping::SeedToSoil => "seed-to-soil",
            Mapping::SoilToFertilizer => "soil-to-fertilizer",
            Mapping::FertilizerToWater => "fertilizer-to-water",
            Mapping::WaterToLight => "water-to-light",
            Mapping::LightToTemperature => "light-to-temperature",
            Mapping::TemperatureToHumidity => "temperature-to-humidity",
            Mapping::HumidityToLocation => "humidity-to-location",
        }
    }
}

fn get_mapping(input: i128, input_text: String, mapping: Mapping) -> i128 {
    let mut output: Option<i128> = None;
    let map_numbers: Vec<Vec<i128>> = get_all_mappings(input_text, &mapping);
    for map_number in map_numbers {
        let destination = map_number[0];
        let source = map_number[1];
        let range = map_number[2];
        let max_source = source + range - 1;
        if input >= source && input <= max_source {
            output = Some(input - source + destination);
            break;
        }
    }
    if output == None {
        return input;
    } else {
        return output.unwrap();
    }
}

fn get_all_mappings(input_text: String, mapping: &Mapping) -> Vec<Vec<i128>> {
    let mut saving_numbers = false;
    let mut map_numbers: Vec<Vec<i128>> = Vec::new();
    for line in input_text.lines() {
        if line.contains(mapping.value()) {
            saving_numbers = true;
            continue;
        }
        if saving_numbers && line.is_empty() {
            break;
        }
        if saving_numbers == true {
            map_numbers.push(get_vec_numbers(line.to_string()));
        }
    }
    return map_numbers;
}

fn get_seeds(input_text: String) -> Vec<i128> {
    let line = input_text.lines().next().unwrap();
    return line.split(':').collect::<Vec<&str>>()[1]
        .split_whitespace()
        .collect::<Vec<&str>>()
        .to_vec()
        .into_iter()
        .map(|number_string: &str| number_string.parse().unwrap())
        .collect();
}

fn get_seeds_part_two(input_text: String) -> Vec<i128> {
    let line = input_text.lines().next().unwrap();
    let mut seeds: Vec<i128> = Vec::new();
    let original_seeds: Vec<i128> = line.split(':').collect::<Vec<&str>>()[1]
        .split_whitespace()
        .collect::<Vec<&str>>()
        .to_vec()
        .into_iter()
        .map(|number_string: &str| number_string.parse().unwrap())
        .collect();
    for (index, original_seed) in original_seeds.iter().enumerate() {
        if index % 2 == 0 {
            let end_value = original_seeds[index + 1];
            for element in *original_seed..(original_seed + end_value) {
                seeds.push(element);
            }
        }
    }
    return seeds;
}

fn get_vec_numbers(line: String) -> Vec<i128> {
    return line
        .split_whitespace()
        .collect::<Vec<&str>>()
        .to_vec()
        .into_iter()
        .map(|number_string: &str| number_string.parse().unwrap())
        .collect();
}

fn get_input() -> String {
    let contents =
        fs::read_to_string("2023/05/input-pau.txt").expect("Should have been able to read the file");
    contents
}

// This doesn't work
#[cfg(test)]
mod tests {
    use crate::Mapping;

    use super::get_mapping;

    #[test]
    fn given_edge_below_when_mapping_map_it() {
        let input: i128 = 37;
        let input_text = String::from(
            "seeds: 79 14 55 13\n
                                                algo\n
                                                34 43 12\n
                                                fertilizer-to-water map:\n
                                                49 53 8\n
                                                0 11 42\n
                                                42 0 7\n
                                                57 7 4",
        );
        let mapping = Mapping::FertilizerToWater;
        assert_eq!(0, get_mapping(input, input_text, mapping));
    }
}
