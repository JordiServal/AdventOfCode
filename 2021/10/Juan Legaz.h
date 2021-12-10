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
#include <stack>
#include <algorithm>
#include <array>

class C2021E10
{
public:
	const std::array<char, 4> openingChars = {
		'(',
		'[',
		'{',
		'<'
	};
	const std::array<char, 4> closingChars = {
		')',
		']',
		'}',
		'>'
	};
	const std::array<int, 4> values = {
		3,
		57,
		1197,
		25137
	};

	inline void P1() {
		std::ifstream file("E:/Input.txt");
		std::string line;
		int sum = 0;
		while (std::getline(file, line)) {
			std::stack<size_t> openedChars;

			for (const char c : line) {
				auto findIt = std::find(openingChars.cbegin(), openingChars.cend(), c);

				if (findIt != openingChars.cend()) {
					size_t idx = findIt - openingChars.cbegin();
					openedChars.push(idx);
				}
				else {
					findIt = std::find(closingChars.cbegin(), closingChars.cend(), c);
					size_t idx = findIt - closingChars.cbegin();
					size_t lastOpenedIdx = openedChars.top();
					openedChars.pop();

					if (lastOpenedIdx != idx) {
						sum += values[idx];
						break;
					}

				}
			}
		}

		std::cout << sum;
	}

	inline void P2() {
		std::ifstream file("E:/Input.txt");
		std::string line;
		std::vector<uint64_t> autocompleteScores;
		while (std::getline(file, line)) {
			std::stack<size_t> openedChars;
			bool corrupted = false;
			for (const char c : line) {
				auto findIt = std::find(openingChars.cbegin(), openingChars.cend(), c);

				if (findIt != openingChars.cend()) {
					size_t idx = findIt - openingChars.cbegin();
					openedChars.push(idx);
				}
				else {
					findIt = std::find(closingChars.cbegin(), closingChars.cend(), c);
					size_t idx = findIt - closingChars.cbegin();
					size_t lastOpenedIdx = openedChars.top();
					openedChars.pop();

					if (lastOpenedIdx != idx) {
						corrupted = true;
						break;
					}
				}
			}

			if (!corrupted) {
				uint64_t sum = 0;
				while (openedChars.size() != 0) {
					sum *= 5;

					size_t lastOpenedIdx = openedChars.top();
					openedChars.pop();

					sum += lastOpenedIdx + 1Ui64;
				}

				autocompleteScores.push_back(sum);
			}
		}

		std::sort(autocompleteScores.begin(), autocompleteScores.end());
		std::cout << autocompleteScores[autocompleteScores.size()/2];
	}
};