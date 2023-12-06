use std::fs;

fn main() {
    let res_part_one = part_one();
    println!("Part one: {}", res_part_one);
    let res_part_two = part_two();
    println!("Part two: {}", res_part_two);
}

fn part_two() -> i128 {
    let contents = get_input();
    return 0;
}

fn part_one() -> i128 {
    let input_text = get_input();
    let seeds: Vec<i128> = get_seeds(input_text.clone());
    println!("{:?}", seeds);
    let mut locations: Vec<i128> = Vec::new();
    for seed in seeds {
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
            Mapping::HumidityToLocation => "humidity-to-locatiwdon",
        }
    }
}

fn get_mapping(input: i128, input_text: String, mapping: Mapping) -> i128 {
    let mut output: Option<i128> = None;
    let map_numbers: Vec<Vec<i128>> =  get_all_mappings(input_text, &mapping);
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
