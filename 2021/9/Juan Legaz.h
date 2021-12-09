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

class C2021E9
{
public:
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

		int sum = 0;
		for (int i = 0; i < grid.size(); ++i) {
			for (int j = 0; j < grid[i].size(); ++j) {
				bool lowest = true;
				int minJ = std::max(0, j - 1);
				int maxJ = std::min(static_cast<int>(grid[i].size() - 1), j + 1);
				int minI = std::max(0, i - 1);
				int maxI = std::min(static_cast<int>(grid.size() - 1), i + 1);

				if (minJ != j) {
					lowest &= grid[i][minJ] > grid[i][j];
				}
				if (maxJ != j) {
					lowest &= grid[i][maxJ] > grid[i][j];
				}
				if (minI != i) {
					lowest &= grid[minI][j] > grid[i][j];
				}
				if (maxI != i) {
					lowest &= grid[maxI][j] > grid[i][j];
				}

				if (lowest) {
					sum += grid[i][j] + 1;
				}

			}
		}

		std::cout << sum;
	}


	void SearchBasin(const std::pair<size_t,size_t>& coord, const std::vector<std::vector<size_t>>& grid, std::set<std::pair<size_t, size_t>>& basin) {
		basin.insert(coord);

		int minJ = std::max(0, static_cast<int>(coord.second) - 1);
		int maxJ = std::min(grid[coord.first].size() - 1, coord.second + 1);
		int minI = std::max(0, static_cast<int>(coord.first)- 1);
		int maxI = std::min(grid.size() - 1, coord.first + 1);

		if (minJ != coord.second) {
			if (grid[coord.first][minJ] != 9 && grid[coord.first][minJ] > grid[coord.first][coord.second]) {
				SearchBasin(std::make_pair(coord.first, minJ), grid, basin);
			}
		}
		if (maxJ != coord.second) {
			if (grid[coord.first][maxJ] != 9 && grid[coord.first][maxJ] > grid[coord.first][coord.second]) {
				SearchBasin(std::make_pair(coord.first, maxJ), grid, basin);
			}
		}
		if (minI != coord.first) {
			if (grid[minI][coord.second] != 9 && grid[minI][coord.second] > grid[coord.first][coord.second]) {
				SearchBasin(std::make_pair(minI, coord.second), grid, basin);
			}
		}
		if (maxI != coord.first) {
			if (grid[maxI][coord.second] != 9 && grid[maxI][coord.second] > grid[coord.first][coord.second]) {
				SearchBasin(std::make_pair(maxI, coord.second), grid, basin);
			}
		}
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

		std::vector<std::pair<size_t, size_t>> lowPoints;
		for (int i = 0; i < grid.size(); ++i) {
			for (int j = 0; j < grid[i].size(); ++j) {
				bool lowest = true;
				int minJ = std::max(0, j - 1);
				int maxJ = std::min(static_cast<int>(grid[i].size() - 1), j + 1);
				int minI = std::max(0, i - 1);
				int maxI = std::min(static_cast<int>(grid.size() - 1), i + 1);

				if (minJ != j) {
					lowest &= grid[i][minJ] > grid[i][j];
				}
				if (maxJ != j) {
					lowest &= grid[i][maxJ] > grid[i][j];
				}
				if (minI != i) {
					lowest &= grid[minI][j] > grid[i][j];
				}
				if (maxI != i) {
					lowest &= grid[maxI][j] > grid[i][j];
				}

				if (lowest) {
					lowPoints.push_back(std::make_pair(i, j));
				}

			}
		}

		std::vector<std::set<std::pair<size_t, size_t>>> basins;
		for (const auto pair : lowPoints) {
			std::set<std::pair<size_t, size_t>> currentBasin;
			SearchBasin(pair, grid, currentBasin);
			basins.push_back(currentBasin);
		}

		std::sort(basins.begin(), basins.end(), [](std::set<std::pair<size_t, size_t>> a, std::set<std::pair<size_t, size_t>> b)->bool {return a.size() > b.size(); });

		int mul = 1;
		for (int i = 0; i < 3; ++i) {			
			mul *= basins[i].size();
		}

		std::cout << mul;
	}
};