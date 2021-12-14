#pragma once

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <set>
#include <map>
#include <unordered_map>
#include <tuple>
#include <cmath>
#include <bitset>
#include <queue>
#include <stack>
#include <algorithm>
#include <array>
#include <list>
#include <intsafe.h>

class C2021E14
{
public:

	void Step(std::list<char>& io_charlist, std::map<char, size_t>& charCount, const std::map<char, std::map<char, char>>& codeDict) {
		auto prevIt = io_charlist.cbegin();
		auto lookIt = io_charlist.cbegin();
		++lookIt;
		for (; lookIt != io_charlist.cend(); ++lookIt) {
			char prevC = *prevIt;
			++prevIt;

			char newChar = codeDict.at(prevC).at(*lookIt);
			++charCount[newChar];
			io_charlist.insert(lookIt, newChar);
		}

	}
	inline int64_t P1() {
		std::ifstream file("E:/InputE14.txt");
		std::string line;
		std::list<char> linkedChars;
		std::map<char, std::map<char, char>> codeDict;
		std::map<char, size_t> charCount;
		while (std::getline(file, line)) {
			size_t tokenIdx = line.find('>');

			if (tokenIdx == std::string::npos) {
				if (line.size() > 2) {
					for (const char& c : line) {
						linkedChars.push_back(c);
						++charCount[c];
					}
				}
			}
			else {
				codeDict[line[0]].emplace(line[1], line[tokenIdx + 2]);
			}
		}

		for (size_t i = 0; i < 10; ++i) {
			Step(linkedChars, charCount, codeDict);
		}

		size_t min = SIZE_T_MAX;
		size_t max = 0;
		//const std::pair<const char, size_t>* maxP = nullptr;
		//const std::pair<const char, size_t>* minP = nullptr;
		for (const auto& pair : charCount) {
			if (pair.second < min) {
				min = pair.second;
				//minP = &pair;
			}
			if (pair.second > max) {
				max = pair.second;
				//maxP = &pair;
			}
		}

		return max - min;
	}

	inline int64_t P2() {
		std::ifstream file("E:/InputE14.txt");
		std::string line;

		std::unordered_map<std::string, std::string> codeDict;
		std::unordered_map<std::string, int64_t> pairCount;

		std::string polymer;
		while (std::getline(file, line)) {
			size_t tokenIdx = line.find('>');
			if (tokenIdx == std::string::npos) {
				if (line.size() > 2) {
					polymer = line;

					for (size_t i = 0; i < line.size() - 1; i++) {
						++pairCount[line.substr(i, 2)];
					}
				}
			}
			else {
				codeDict[line.substr(0, 2)] = line[tokenIdx + 2];
			}
		}

		std::unordered_map<std::string, int64_t> pairCountBuffer;
		for (size_t i = 0; i < 40; i++) {
			for(auto it = pairCount.begin();it != pairCount.end();){
				std::string newChar = codeDict[it->first];
				pairCountBuffer[it->first[0] + newChar] += it->second;
				pairCountBuffer[newChar + it->first[1]] += it->second;

				it = pairCount.erase(it);
			}

			std::swap(pairCount, pairCountBuffer);
		}

		if (pairCountBuffer.size() > 0) {
			pairCount = pairCountBuffer;
		}

		int64_t min = INT64_MAX;
		int64_t max = 0;
		std::map<char, int64_t> charCount;
		charCount[polymer.back()] = 1;
		for (const auto& pair : pairCount) {
			int64_t& count = charCount[pair.first[0]];
			count += pair.second;
			if (max < count) {
				max = count;
			}
		}

		for (const auto& pair : charCount) {
			if (min > pair.second) {
				min = pair.second;
			}
		}

		return max - min;
	}
};