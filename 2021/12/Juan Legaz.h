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
#include <stack>
#include <algorithm>
#include <array>

class C2021E12
{
public:

	struct ExplorationNode {
		ExplorationNode(std::string i_id) :
			id(i_id), explorationIdx(0), allowSmall(false)
		{}

		ExplorationNode(std::string i_id, bool i_allowSmall) :
			id(i_id), explorationIdx(0), allowSmall(i_allowSmall)
		{}

		std::string id;
		size_t explorationIdx = 0;
		bool allowSmall;
	};

	inline int64_t P1() {
		std::ifstream file("E:/InputE12.txt");
		std::string line;
		std::map<std::string, std::vector<std::string>> caves;
		while (std::getline(file, line)) {
			size_t tokenIdx = line.find('-');
			std::string from = line.substr(0, tokenIdx);
			std::string to = line.substr(tokenIdx + 1, line.length());

			std::vector<std::string>& connections = caves[from];
			connections.push_back(to);
			std::vector<std::string>& connectionsTo = caves[to];
			connectionsTo.push_back(from);
		}

		for (auto it = caves.begin(); it != caves.end();) {
			if (std::isupper(it->first[0]) == 0 && it->second.size() == 1 && std::isupper((*it->second.cbegin())[0]) == 0) {
				it = caves.erase(it);
			}
			else {
				++it;
			}
		}

		std::stack<ExplorationNode> positionsToVisit;

		positionsToVisit.push(ExplorationNode("start"));

		int paths = 0;
		while (positionsToVisit.size() > 0) {
			ExplorationNode& currNode = positionsToVisit.top();

			if (currNode.explorationIdx == caves[currNode.id].size()) {
				positionsToVisit.pop();
				continue;
			}

			std::string node = caves[currNode.id][currNode.explorationIdx];
			++currNode.explorationIdx;

			if (node == "start") {
				continue;
			}
			if (node == "end") {
				++paths;
				continue;
			}

			bool isSmall = std::isupper(node[0]) == 0;
			if (isSmall) {
				const auto& container = positionsToVisit._Get_container();
				auto it = std::find_if(container.cbegin(), container.cend(), [&node](ExplorationNode exNode)->bool {return node == exNode.id; });

				if (it == container.cend()) {
					positionsToVisit.push(ExplorationNode(node));
				}
			}
			else {
				positionsToVisit.push(ExplorationNode(node));
			}
		}

		return paths;
	}

	inline int64_t P2() {
		std::ifstream file("E:/InputE12.txt");
		std::string line;
		std::map<std::string, std::vector<std::string>> caves;
		while (std::getline(file, line)) {
			size_t tokenIdx = line.find('-');
			std::string from = line.substr(0, tokenIdx);
			std::string to = line.substr(tokenIdx + 1, line.length());

			std::vector<std::string>& connections = caves[from];
			connections.push_back(to);
			std::vector<std::string>& connectionsTo = caves[to];
			connectionsTo.push_back(from);
		}

		std::stack<ExplorationNode> positionsToVisit;
		positionsToVisit.push(ExplorationNode("start", true));

		int paths = 0;
		while (positionsToVisit.size() > 0) {
			ExplorationNode& currNode = positionsToVisit.top();

			if (currNode.explorationIdx == caves[currNode.id].size()) {
				positionsToVisit.pop();
				continue;
			}

			std::string node = caves[currNode.id][currNode.explorationIdx];
			++currNode.explorationIdx;

			if (node == "start") {
				continue;
			}
			if (node == "end") {
				++paths;
				continue;
			}

			bool isSmall = std::isupper(node[0]) == 0;
			if (isSmall) {
				const auto& container = positionsToVisit._Get_container();
				auto it = std::find_if(container.cbegin(), container.cend(), [&node](ExplorationNode exNode)->bool {return node == exNode.id; });

				if (it == container.cend()) {
					positionsToVisit.push(ExplorationNode(node, currNode.allowSmall));
				}
				else {
					if (currNode.allowSmall) {
						positionsToVisit.push(ExplorationNode(node, false));
					}
				}
			}
			else {
				positionsToVisit.push(ExplorationNode(node, currNode.allowSmall));
			}
		}

		return paths;
	}
};