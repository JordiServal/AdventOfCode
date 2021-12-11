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

class C2021E11
{
public:
	inline void SimulateStep(std::vector<std::vector<size_t>>& grid, std::vector<std::pair<size_t, size_t>>& flashedOctopi) {
		for (auto& r : grid) {
			for (size_t& charge : r) {
				++charge;
			}
		}

		std::vector<std::pair<size_t, size_t>> flashesToResolve;

		for (size_t i = 0; i < grid.size(); ++i) {
			for (size_t j = 0; j < grid[i].size(); ++j) {
				auto key = std::make_pair(i, j);
				auto findIt = std::find(flashedOctopi.cbegin(), flashedOctopi.cend(), key);
				if (grid[i][j] > 9 && findIt == flashedOctopi.cend()) {
					flashesToResolve.push_back(key);
				}
			}
		}

		flashedOctopi.insert(flashedOctopi.cbegin(), flashesToResolve.cbegin(), flashesToResolve.cend());
		if (flashesToResolve.size() > 0) {
			while (flashesToResolve.size() > 0) {
				auto flashedkey = flashesToResolve.back();
				flashesToResolve.pop_back();
				grid[flashedkey.first][flashedkey.second] = 0;

				for (int i = static_cast<int>(flashedkey.first) - 1; i <= static_cast<int>(flashedkey.first) + 1; ++i) {
					if (i == -1 || i == grid.size()) {
						continue;
					}
					for (int j = static_cast<int>(flashedkey.second) - 1; j <= static_cast<int>(flashedkey.second) + 1; ++j) {
						if (j == -1 || j == grid[i].size() || (flashedkey.first == i && flashedkey.second == j)) {
							continue;
						}
						auto key = std::make_pair(static_cast<size_t>(i), static_cast<size_t>(j));
						auto findIt = std::find(flashedOctopi.cbegin(), flashedOctopi.cend(), key);
						if (findIt == flashedOctopi.cend()) {
							grid[i][j]++;
							if (grid[i][j] > 9) {
								flashesToResolve.push_back(key);
								flashedOctopi.push_back(key);
							}
						}
					}
				}
			}
		}
	}

	inline void P1() {
		std::ifstream file("E:/Input.txt");
		std::string line;
		std::vector<std::vector<size_t>> grid;
		while (std::getline(file, line)) {
			std::vector<size_t> row;
			for (char c : line) {
				row.push_back(c - '0');
			}
			grid.push_back(row);
		}

		int flashes = 0;
		for (int i = 0; i < 100; ++i) {
			std::vector<std::pair<size_t, size_t>> flashesThisSimulation;
			SimulateStep(grid, flashesThisSimulation);
			flashes += flashesThisSimulation.size();


			//std::cout << "step " << i + 1 << std::endl;
			//for (auto row : grid) {
			//	for (auto num : row) {
			//		std::cout << " " << num;
			//	}
			//	std::cout << std::endl;
			//}
		}

		std::cout << flashes;
	}

	inline void P2() {
		std::ifstream file("E:/Input.txt");
		std::string line;
		std::vector<std::vector<size_t>> grid;
		while (std::getline(file, line)) {
			std::vector<size_t> row;
			for (char c : line) {
				row.push_back(c - '0');
			}
			grid.push_back(row);
		}
		int octopiCount = grid.size() * grid[0].size();
		bool synced = false;
		int step = 0;
		while (!synced) {

			std::vector<std::pair<size_t, size_t>> flashesThisSimulation;
			SimulateStep(grid, flashesThisSimulation);
			synced = flashesThisSimulation.size() == octopiCount;
			++step;
			//std::cout << "step " << step << std::endl;
			//for (auto row : grid) {
			//	for (auto num : row) {
			//		std::cout << " " << num;
			//	}
			//	std::cout << std::endl;
			//}
		}

		std::cout << step;
	}
};