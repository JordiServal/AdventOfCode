#pragma once

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <bitset>
#include <cmath>

constexpr int c_wordLength = 12;

class C2021E3
{
public:

	inline void P1() {
		std::ifstream file("E:/Input.txt");
		uint32_t gamma = 0;
		uint32_t epsilon = 0;
		int entries = 0;

		std::string line;
		std::getline(file, line);
		std::vector<int> bitsOnCount(line.length(), 0);
		file.seekg(0);

		while (std::getline(file, line)) {
			++entries;

			for (int i = line.length() - 1; i >= 0; --i) {
				if (line[i] == '1') {
					int idx = std::abs(i - static_cast<int>(line.length() - 1));
					++bitsOnCount[idx];
				}
			}
		}

		for (size_t i = 0; i < bitsOnCount.size(); ++i) {
			if (bitsOnCount[i] >= std::ceil(entries / 2.f)) {
				gamma |= 1 << i;
			}
			else {
				epsilon |= 1 << i;
			}
		}

		std::cout << gamma * epsilon;
	}

	inline void P2() {
		std::ifstream file("E:/Input.txt");
		std::string line;
		std::vector<std::bitset<c_wordLength>> mostSignificant;
		std::vector<std::bitset<c_wordLength>> leastSignificant;

		while (std::getline(file, line)) {
			mostSignificant.push_back(std::bitset<c_wordLength>(line));
			leastSignificant.push_back(std::bitset<c_wordLength>(line));
		}

		auto SearchValue = [](std::vector<std::bitset<c_wordLength>>& words, bool significant) {
			for (int i = c_wordLength - 1; i >= 0; --i) {
				int bitsOnCount = 0;
				for (const auto bitset : words) {
					if (bitset.test(i)) {
						++bitsOnCount;
					}
				}

				bool wantsBitsOn = bitsOnCount >= std::ceil(words.size() / 2.f);		
				wantsBitsOn = significant ? wantsBitsOn : !wantsBitsOn;

				if (words.size() > 1) {
					for (auto it = words.begin(); it != words.end();) {
						bool isValid = !(it->test(i) ^ wantsBitsOn);
						if (!isValid) {
							it = words.erase(it);
						}
						else {
							++it;
						}
					}
				}
				else {
					break;
				}
			}
		};
		SearchValue(mostSignificant, true);
		SearchValue(leastSignificant, false);

		std::cout << "oxygen: " << mostSignificant[0].to_ulong() << "\nCO2: " << leastSignificant[0].to_ulong() << "\nLife: " << mostSignificant[0].to_ulong() * leastSignificant[0].to_ulong();
	}
};

