#pragma once

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <set>
#include <map>
#include <tuple>
#include <cmath>
#include <bitset>
#include <algorithm>
#include <array>

enum class SegmentMask : int8_t {
	None = 0,
	A = 1 << 0,
	B = 1 << 1,
	C = 1 << 2,
	D = 1 << 3,
	E = 1 << 4,
	F = 1 << 5,
	G = 1 << 6,
	ALL = A | B | C | D | E | F | G
};

SegmentMask operator|(SegmentMask lhs, SegmentMask rhs) {
	return static_cast<SegmentMask>(static_cast<int8_t>(lhs) | static_cast<int8_t>(rhs));
}
SegmentMask operator&(SegmentMask lhs, SegmentMask rhs) {
	return static_cast<SegmentMask>(static_cast<int8_t>(lhs) & static_cast<int8_t>(rhs));
}
SegmentMask operator~(SegmentMask seg) {
	return static_cast<SegmentMask>(~static_cast<int8_t>(seg));
}

template<unsigned int T = 7>
std::bitset<T> ToBitset(SegmentMask seg) {
	return std::bitset<T>(static_cast<int8_t>(seg));
}

class C2021E8
{
public:
	const std::vector<std::bitset<7>> segmentIndexes = {
		{ToBitset<7>(~SegmentMask::D & SegmentMask::ALL)},
		{ToBitset<7>(SegmentMask::C | SegmentMask::F)},
		{ToBitset<7>(SegmentMask::A | SegmentMask::C | SegmentMask::D | SegmentMask::E | SegmentMask::G)},
		{ToBitset<7>(SegmentMask::A | SegmentMask::C | SegmentMask::D | SegmentMask::F | SegmentMask::G)},
		{ToBitset<7>(SegmentMask::B | SegmentMask::C | SegmentMask::D | SegmentMask::F)},
		{ToBitset<7>(SegmentMask::A | SegmentMask::B | SegmentMask::D | SegmentMask::F | SegmentMask::G)},
		{ToBitset<7>(SegmentMask::A | SegmentMask::B | SegmentMask::D | SegmentMask::E | SegmentMask::F | SegmentMask::G)},
		{ToBitset<7>(SegmentMask::A | SegmentMask::C | SegmentMask::F)},
		{ToBitset<7>(SegmentMask::ALL)},
		{ToBitset<7>(~SegmentMask::E & SegmentMask::ALL)},
	};

	const std::array<char, 7> c_segments = { 'a','b','c','d','e','f','g' };

	inline void P1() {
		std::ifstream file("E:/Input.txt");
		std::string line;

		std::array<int, 10> numbersCount;
		numbersCount.fill(0);
		while (std::getline(file, line)) {
			size_t idx = line.find('|');
			std::string fourDigits = line.substr(idx + 2, line.size());

			std::string word;
			std::stringstream strStream(fourDigits);
			while (std::getline(strStream, word, ' ')) {
				std::vector<size_t> possibleNumbers;
				for (size_t i = 0; i < segmentIndexes.size(); ++i) {
					if (word.size() == segmentIndexes[i].count()) {
						possibleNumbers.push_back(i);
					}
				}

				if (possibleNumbers.size() == 1) {
					numbersCount[possibleNumbers[0]]++;
				}
			}
		}

		int total = 0;
		for (const int value : numbersCount) {
			total += value;
		}
		std::cout << total;
	}

	inline void P2() {
		std::ifstream file("E:/Input.txt");
		std::string line;
		long sum = 0;
		while (std::getline(file, line)) {
			size_t idx = line.find('|');
			std::string uniqueSignals = line.substr(0, idx);
			std::string fourDigits = line.substr(idx + 2, line.size());

			std::map<char, SegmentMask> finalCode;
			std::array<std::set<char>, 7> codeCandidates;
			std::stringstream strStream(uniqueSignals);
			std::string word;
			while (std::getline(strStream, word, ' ')) {

				std::array<std::set<char>, 7> wordCandidates;

				std::vector<char> missingChar;
				for (const char c : c_segments) {
					if (word.find(c) == std::string::npos) {
						missingChar.push_back(c);
					}
				}

				for (const auto& bitset : segmentIndexes) {
					if (word.size() == bitset.count()) {
						for (int i = 0; i < 7; ++i) {
							if (bitset.test(i)) {
								wordCandidates[i].insert(word.begin(), word.end());
							}
							else {
								wordCandidates[i].insert(missingChar.begin(), missingChar.end());
							}
						}
					}
				}

				for (int i = 0; i < wordCandidates.size(); ++i) {
					if (codeCandidates[i].size() == 0) {
						codeCandidates[i] = wordCandidates[i];
					}
					else if (codeCandidates[i].size() > 1) {
						for (auto it = codeCandidates[i].begin(); it != codeCandidates[i].end();) {
							if (std::find(wordCandidates[i].cbegin(), wordCandidates[i].cend(), *it) == wordCandidates[i].cend()) {
								it = codeCandidates[i].erase(it);
								if (codeCandidates[i].size() == 1) {
									finalCode.emplace(std::make_pair(*codeCandidates[i].cbegin(), static_cast<SegmentMask>(1 << i)));
								}
							}
							else {
								++it;
							}
						}
					}
				}
			}

			for (int i = 0; i < codeCandidates.size(); ++i) {
				if (codeCandidates[i].size() > 1) {
					for (auto it = codeCandidates[i].begin(); it != codeCandidates[i].end();) {
						bool alreadyFound = finalCode.find(*it) != finalCode.cend();
						if (alreadyFound) {
							it = codeCandidates[i].erase(it);
							if (codeCandidates[i].size() == 1) {
								finalCode.emplace(std::make_pair(*codeCandidates[i].cbegin(), static_cast<SegmentMask>(1 << i)));
							}
						}
						else {
							++it;
						}
					}
				}

			}

			strStream = std::stringstream(fourDigits);
			int multiplier = 1000;
			while (std::getline(strStream, word, ' ')) {
				SegmentMask segmentCode = SegmentMask::None;
				for (const char c : word) {
					segmentCode = segmentCode | finalCode[c];
				}
				for (size_t i = 0; i < segmentIndexes.size(); ++i) {
					if (segmentIndexes[i].to_ulong() == static_cast<int>(segmentCode)) {
						//std::cout << i << " ";
						sum += i * multiplier;
						multiplier /= 10;
						break;
					}
				}
			}
			//std::cout << std::endl;

		}
		std::cout << sum;
	}
};