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
#include <queue>
#include <algorithm>
#include <array>

class C2021E12
{
public:

	inline int64_t P1() {
		std::ifstream file("E:/InputE12.txt");
		std::string line;
		std::map<std::string, std::set<std::string>> caves;
		while (std::getline(file, line)) {
			size_t tokenIdx = line.find('-');
			std::string from = line.substr(0, tokenIdx);
			std::string to = line.substr(tokenIdx + 1, line.length());

			std::set<std::string>& connections = caves[from];
			connections.emplace(to);
			std::set<std::string>& connectionsTo = caves[to];
			connectionsTo.emplace(from);
		}

		for (auto it = caves.begin(); it != caves.end();) {
			if (std::isupper(it->first[0]) == 0 && it->second.size() == 1 && std::isupper((*it->second.cbegin())[0]) == 0) {
				it = caves.erase(it);
			}
			else {
				++it;
			}
		}

		std::queue<std::pair<std::string, std::set<std::string>>> positionsToVisit;		
		
		positionsToVisit.push(std::make_pair("start", std::set<std::string>()));
		int paths = 0;
		while (positionsToVisit.size() > 0) {
			std::pair<std::string, std::set<std::string>>& chain = positionsToVisit.front();

			for (const std::string& node : caves[chain.first]) {
				if (node == "start") {
					continue;
				}

				if (node == "end") {
					++paths;
				}
				else {
					bool isSmall = std::isupper(node[0]) == 0;
					if (!isSmall || (isSmall && chain.second.find(node) == chain.second.cend())) {
						// so much copies... baby jesus is crying
						std::set<std::string> newSet = chain.second;
						if (isSmall) {
							newSet.emplace(node);
						}
						positionsToVisit.push(std::make_pair(node, std::move(newSet)));

					}
				}
			}

			positionsToVisit.pop();
		}

		return paths;
	}

	inline int64_t P2() {
		std::ifstream file("E:/InputE12.txt");
		std::string line;
		std::map<std::string, std::set<std::string>> caves;
		while (std::getline(file, line)) {
			size_t tokenIdx = line.find('-');
			std::string from = line.substr(0, tokenIdx);
			std::string to = line.substr(tokenIdx + 1, line.length());

			std::set<std::string>& connections = caves[from];
			connections.emplace(to);
			std::set<std::string>& connectionsTo = caves[to];
			connectionsTo.emplace(from);
		}

		std::queue<std::tuple<std::string, std::set<std::string>, bool>> positionsToVisit;

		positionsToVisit.push(std::make_tuple("start", std::set<std::string>(), true));
		int paths = 0;

		while (positionsToVisit.size() > 0) {
			std::tuple<std::string, std::set<std::string>, bool>& chain = positionsToVisit.front();

			for (const std::string& node : caves[std::get<0>(chain)]) {
				if (node == "start") {
					continue;
				}

				if (node == "end") {
					++paths;
				}
				else {
					bool isSmall = std::isupper(node[0]) == 0;
					if (!isSmall || (isSmall && std::get<1>(chain).find(node) == std::get<1>(chain).cend())) {
						// baby jesus noooooooooooooooooooo
						std::set<std::string> newSet = std::get<1>(chain);
						if (isSmall) {
							newSet.emplace(node);
						}
						positionsToVisit.push(std::make_tuple(node, std::move(newSet), std::get<2>(chain)));
					}
					else {
						if (std::get<2>(chain)) {
							positionsToVisit.push(std::make_tuple(node, std::get<1>(chain), false));
						}
					}
				}
			}

			positionsToVisit.pop();
		}

		return paths;
	}
};