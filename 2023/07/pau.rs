use std::cmp::Ordering;
use std::fs;

fn main() {
    let res_part_one = part_one();
    println!("Part one: {}", res_part_one);
    let res_part_two = part_two();
    println!("Part two: {}", res_part_two);
}

#[derive(Debug, PartialEq, Eq, Hash)]
struct Bidder {
    hand: String,
    bid: u32,
}

#[derive(PartialEq, PartialOrd, Eq, Ord)]
enum Rank {
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind,
}

#[derive(PartialEq, PartialOrd, Eq, Ord)]
enum AlphabeticCard {
    T,
    J,
    Q,
    K,
    A,
}

fn part_one() -> u32 {
    let input = get_input();
    let mut bidders = input
        .lines()
        .filter_map(map_to_bidder)
        .collect::<Vec<Bidder>>();
    bidders.sort_by(compare_bidders);
    println!("{:#?}", bidders);
    return sum_all_bids(bidders);
}

fn part_two() -> u32 {
    return 0;
}

fn get_input() -> String {
    fs::read_to_string("2023/07/input-pau.txt").expect("File does not exist.")
}

fn sum_all_bids(bidders: Vec<Bidder>) -> u32 {
    return bidders
        .into_iter()
        .enumerate()
        .map(|(index, bidder)| (index + 1) as u32 * bidder.bid as u32)
        .sum();
}

fn map_to_bidder(text: &str) -> Option<Bidder> {
    let mut split_text = text.split_whitespace();
    let hand = split_text.next()?;
    let bid = split_text.next()?.parse::<u32>().ok()?;
    Some(Bidder {
        hand: hand.to_string(),
        bid: bid,
    })
}

fn compare_bidders(a: &Bidder, b: &Bidder) -> Ordering {
    let rank_a = get_rank(a.hand.clone());
    let rank_b = get_rank(b.hand.clone());
    if rank_a.cmp(&rank_b) != Ordering::Equal {
        return rank_a.cmp(&rank_b);
    } else {
        return compare_by_high_card(a, b);
    }
}

fn compare_by_high_card(a: &Bidder, b: &Bidder) -> Ordering {
    for (index, card) in a.hand.char_indices() {
        let other_card = get_char_at(&b.hand, index);
        if card.cmp(&other_card) != Ordering::Equal {
            if card.is_numeric() && other_card.is_numeric() {
                return card.cmp(&other_card);
            } else if card.is_alphabetic() && other_card.is_numeric() {
                return Ordering::Greater;
            } else if card.is_numeric() && other_card.is_alphabetic() {
                return Ordering::Less;
            } else {
                let card_enum = parse_to_enum(card);
                let other_card_enum = parse_to_enum(other_card);
                return card_enum.cmp(&other_card_enum);
            }
        }
    }
    return Ordering::Equal;
}

fn parse_to_enum(card: char) -> AlphabeticCard {
    match card {
        'T' => AlphabeticCard::T,
        'J' => AlphabeticCard::J,
        'Q' => AlphabeticCard::Q,
        'K' => AlphabeticCard::K,
        _ => AlphabeticCard::A,
    }
}

fn get_char_at(s: &str, index: usize) -> char {
    s.char_indices()
        .find(|(i, _)| *i == index)
        .map(|(_, ch)| ch)
        .unwrap()
}

fn get_rank(hand: String) -> Rank {
    let max_repeated = count_max_repeated_char(hand.clone());
    if max_repeated == 5 {
        return Rank::FiveOfAKind;
    } else if max_repeated == 4 {
        return Rank::FourOfAKind;
    }
    let repeated_chars = get_repeated_chars(hand);
    if repeated_chars.contains(&3) && repeated_chars.contains(&2) {
        return Rank::FullHouse;
    } else if repeated_chars.contains(&3) {
        return Rank::ThreeOfAKind;
    } else if has_two_pairs(repeated_chars.clone()) {
        return Rank::TwoPair;
    } else if repeated_chars.contains(&2) {
        return Rank::OnePair;
    }
    return Rank::HighCard;
}

fn count_max_repeated_char(hand: String) -> u16 {
    get_repeated_chars(hand)
        .into_iter()
        .max()
        .expect("Cannot pass an empty char.")
}

fn get_repeated_chars(hand: String) -> Vec<u16> {
    hand.chars()
        .map(|char| hand.matches(char).count() as u16)
        .collect()
}

fn has_two_pairs(repeated_chars: Vec<u16>) -> bool {
    repeated_chars
        .into_iter()
        .filter(|element| element.eq(&2))
        .count()
        == 4
}

#[cfg(test)]
mod tests {
    use crate::{compare_bidders, map_to_bidder, Bidder};

    #[test]
    fn given_empty_string_when_map_to_bidder_then_return_none() {
        let res = map_to_bidder("");
        assert!(res.is_none())
    }

    #[test]
    fn given_valid_hand_when_map_to_bidder_then_return_bidder() {
        let res = map_to_bidder("QQQJA 483");
        assert_eq!(
            res,
            Some(Bidder {
                hand: "QQQJA".to_string(),
                bid: 483
            })
        );
    }

    #[test]
    fn given_high_card_vs_high_card_when_same_high_card_then_sort_by_first_card() {
        let mut bidders = vec![
            Bidder {
                hand: "37456".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "23457".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "23457");
        assert_eq!(bidders[1].hand, "37456");
    }

    #[test]
    fn given_high_card_vs_high_card_when_same_high_card_then_sort_by_second_card() {
        let mut bidders = vec![
            Bidder {
                hand: "35456".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "32456".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "32456");
        assert_eq!(bidders[1].hand, "35456");
    }

    #[test]
    fn given_high_card_vs_high_card_when_distinct_high_card_then_sort_by_high_card() {
        let mut bidders = vec![
            Bidder {
                hand: "5234T".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "32456".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "32456");
        assert_eq!(bidders[1].hand, "5234T");
    }

    #[test]
    fn given_high_card_vs_one_pair_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "33456".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "6234T".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "6234T");
        assert_eq!(bidders[1].hand, "33456");
    }

    #[test]
    fn given_high_card_vs_two_pair_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "33446".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "A5234".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "A5234");
        assert_eq!(bidders[1].hand, "33446");
    }

    #[test]
    fn given_high_card_vs_three_of_a_kind_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "AAAQT".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "A5234".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "A5234");
        assert_eq!(bidders[1].hand, "AAAQT");
    }

    #[test]
    fn given_high_card_vs_full_house_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "222QQ".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "A5234".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "A5234");
        assert_eq!(bidders[1].hand, "222QQ");
    }

    #[test]
    fn given_high_card_vs_four_of_a_kind_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "2222Q".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "A5234".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "A5234");
        assert_eq!(bidders[1].hand, "2222Q");
    }

    #[test]
    fn given_high_card_vs_five_of_a_kind_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "TTTTT".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "Q5234".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "Q5234");
        assert_eq!(bidders[1].hand, "TTTTT");
    }

    #[test]
    fn given_one_pair_vs_one_pair_when_compare_then_sort_by_first_card() {
        let mut bidders = vec![
            Bidder {
                hand: "34459".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "22534".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "22534");
        assert_eq!(bidders[1].hand, "34459");
    }

    #[test]
    fn given_one_pair_vs_two_pair_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "J4499".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "A2234".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "A2234");
        assert_eq!(bidders[1].hand, "J4499");
    }

    #[test]
    fn given_one_pair_vs_three_of_a_kind_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "JJJ59".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "A2234".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "A2234");
        assert_eq!(bidders[1].hand, "JJJ59");
    }

    #[test]
    fn given_one_pair_vs_full_house_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "JJJ99".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "A2234".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "A2234");
        assert_eq!(bidders[1].hand, "JJJ99");
    }

    #[test]
    fn given_one_pair_vs_four_of_a_kind_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "JJJJ9".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "A2234".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "A2234");
        assert_eq!(bidders[1].hand, "JJJJ9");
    }

    #[test]
    fn given_one_pair_vs_five_of_a_kind_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "QQQQQ".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "A2234".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "A2234");
        assert_eq!(bidders[1].hand, "QQQQQ");
    }

    #[test]
    fn given_two_pair_vs_two_pair_when_compare_then_sort_by_first_card() {
        let mut bidders = vec![
            Bidder {
                hand: "A2233".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "2AAQQ".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "2AAQQ");
        assert_eq!(bidders[1].hand, "A2233");
    }

    #[test]
    fn given_two_pair_vs_three_of_a_kind_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "TTT32".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "AKKQQ".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "AKKQQ");
        assert_eq!(bidders[1].hand, "TTT32");
    }

    #[test]
    fn given_two_pair_vs_full_house_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "TTT33".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "AKKQQ".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "AKKQQ");
        assert_eq!(bidders[1].hand, "TTT33");
    }

    #[test]
    fn given_two_pair_vs_four_of_a_kind_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "TTTT2".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "AKKQQ".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "AKKQQ");
        assert_eq!(bidders[1].hand, "TTTT2");
    }

    #[test]
    fn given_two_pair_vs_five_of_a_kind_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "55555".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "AKKQQ".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "AKKQQ");
        assert_eq!(bidders[1].hand, "55555");
    }

    #[test]
    fn given_three_of_a_kind_vs_three_of_a_kind_when_compare_then_sort_by_first_card() {
        let mut bidders = vec![
            Bidder {
                hand: "A6662".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "K9992".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "K9992");
        assert_eq!(bidders[1].hand, "A6662");
    }

    #[test]
    fn given_three_of_a_kind_vs_full_house_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "99922".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "A6662".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "A6662");
        assert_eq!(bidders[1].hand, "99922");
    }

    #[test]
    fn given_three_of_a_kind_vs_four_of_a_kind_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "99992".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "A6662".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "A6662");
        assert_eq!(bidders[1].hand, "99992");
    }

    #[test]
    fn given_three_of_a_kind_vs_five_of_a_kind_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "99999".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "A6662".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "A6662");
        assert_eq!(bidders[1].hand, "99999");
    }

    #[test]
    fn given_four_of_a_kind_vs_four_of_a_kind_when_compare_then_sort_by_first_card() {
        let mut bidders = vec![
            Bidder {
                hand: "A6666".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "K6666".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "K6666");
        assert_eq!(bidders[1].hand, "A6666");
    }

    #[test]
    fn given_four_of_a_kind_vs_five_of_a_kind_when_compare_then_sort_by_rank() {
        let mut bidders = vec![
            Bidder {
                hand: "99999".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "A6666".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "A6666");
        assert_eq!(bidders[1].hand, "99999");
    }

    #[test]
    fn given_five_of_a_kind_vs_five_of_a_kind_when_compare_then_sort_by_first_card() {
        let mut bidders = vec![
            Bidder {
                hand: "99999".to_string(),
                bid: 483,
            },
            Bidder {
                hand: "22222".to_string(),
                bid: 500,
            },
        ];
        bidders.sort_by(compare_bidders);
        assert_eq!(bidders[0].hand, "22222");
        assert_eq!(bidders[1].hand, "99999");
    }
}
