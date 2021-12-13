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

class C2021E13
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
		std::ifstream file("E:/InputE13.txt");
		std::string line;
		std::queue<std::pair<int16_t, int16_t>> pointsToProcess;
		std::vector<std::pair<char, int16_t>> folds;

		while (std::getline(file, line)) {
			if (line[0] != 'f') {
				size_t tokenIdx = line.find(',');
				if (tokenIdx != std::string::npos) {
					int16_t x = atoi(line.substr(0, tokenIdx).c_str());
					int16_t y = atoi(line.substr(tokenIdx + 1, line.length()).c_str());

					pointsToProcess.emplace(x, y);
				}
			}
			else {
				size_t tokenIdx = line.find('=');
				char c = line[tokenIdx - 1];
				int16_t idx = atoi(line.substr(tokenIdx + 1, line.length()).c_str());
				folds.emplace_back(c, idx);				
				break; // Part 1 only 1 fold
			}
		}

		std::set<std::pair<int16_t, int16_t>> finalPoints;

		while (pointsToProcess.size() > 0) {
			std::pair<int16_t, int16_t>& p = pointsToProcess.front();
			pointsToProcess.pop();

			for (const auto& fold : folds) {
				int16_t& v = fold.first == 'x' ? p.first : p.second;
				if (v > fold.second) {
					v = fold.second + fold.second - v;
				}
			}
			finalPoints.insert(std::move(p));
		}

		return finalPoints.size();
	}

	inline int64_t P2() {
		std::ifstream file("E:/InputE13.txt");
		std::string line;
		std::queue<std::pair<int16_t, int16_t>> pointsToProcess;
		std::vector<std::pair<char, int16_t>> folds;

		while (std::getline(file, line)) {
			if (line[0] != 'f') {
				size_t tokenIdx = line.find(',');
				if (tokenIdx != std::string::npos) {
					int16_t x = atoi(line.substr(0, tokenIdx).c_str());
					int16_t y = atoi(line.substr(tokenIdx + 1, line.length()).c_str());

					pointsToProcess.emplace(x, y);
				}
			}
			else {
				size_t tokenIdx = line.find('=');
				char c = line[tokenIdx - 1];
				int16_t idx = atoi(line.substr(tokenIdx + 1, line.length()).c_str());
				folds.emplace_back(c, idx);
			}
		}

		std::set<std::pair<int16_t, int16_t>> finalPoints;

		std::pair<size_t, size_t> finalBounds = { 0,0 };

		while (pointsToProcess.size() > 0) {
			std::pair<int16_t, int16_t>& p = pointsToProcess.front();
			pointsToProcess.pop();

			for (const auto& fold : folds) {
				int16_t& v = fold.first == 'x' ? p.first : p.second;
				if (v > fold.second) {
					v = fold.second + fold.second - v;
				}
			}

			if (finalBounds.first <= p.first) {
				finalBounds.first = p.first + 1;
			}
			if (finalBounds.second <= p.second) {
				finalBounds.second = p.second + 1;
			}

			finalPoints.insert(std::move(p));
		}


		std::vector<std::vector<bool>> finalDots;
		finalDots.resize(finalBounds.second, std::vector<bool>(finalBounds.first));

		for (const auto& point : finalPoints) {
			finalDots[point.second][point.first] = true;
		}


		for (auto r : finalDots) {
			std::cout << '\n';
			for (auto b : r) {
				b ? std::cout << '#' : std::cout << '.';
			}
		}

		return 0;
	}
};