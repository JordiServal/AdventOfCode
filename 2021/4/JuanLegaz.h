#pragma once

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <array>
#include <cmath>


class C2021E4
{
public:

	struct Board {
		std::array<std::array<int, 5>, 5> m_grid;
		std::array<std::array<bool, 5>, 5> m_marks;
		int m_numbersAlreadyFound = 0;

		bool MarkNumber(const int number) {
			bool numberFound = false;
			int row;
			int col;
			for (size_t i = 0; i < m_grid.size(); ++i) {
				for (size_t j = 0; j < m_grid[i].size(); ++j) {
					if (m_grid[i][j] == number) {
						m_marks[i][j] = true;
						numberFound = true;
						++m_numbersAlreadyFound;
						row = i;
						col = j;
					}
				}
			}

			if (numberFound && m_numbersAlreadyFound >= 5) {
				bool winner = true;
				for (size_t j = 0; j < m_marks[row].size(); ++j) {
					winner &= m_marks[row][j];
				}

				if (winner) {
					return true;
				}

				winner = true;
				for (size_t j = 0; j < m_marks[0].size(); ++j) {
					winner &= m_marks[j][col];
				}
				if (winner) {
					return true;
				}
			}

			return false;
		}

		int GetSum() const {
			int sum = 0;
			for (size_t i = 0; i < m_grid.size(); ++i) {
				for (size_t j = 0; j < m_grid[i].size(); ++j) {
					if (!m_marks[i][j]) {
						sum += m_grid[i][j];
					}
				}
			}

			return sum;
		}
	};

	inline void P1() {
		std::ifstream file("E:/Input.txt");
		std::string numberList;
		std::getline(file, numberList);

		std::vector<Board> boards;
		std::string line;
		size_t row = 0;
		size_t boardIdx = 0;
		while (std::getline(file, line)) {
			if (line == "") {
				row = 0;
				boardIdx = boards.size();
				boards.push_back(Board());
				continue;
			}

			size_t currPos = 0;
			size_t col = 0;
			while (currPos < line.length())
			{
				size_t nextSpace = line.find(' ', currPos);
				while (currPos == nextSpace) { // swallow multiple spaces
					++currPos;
					nextSpace = line.find(' ', currPos);
				}

				nextSpace = nextSpace == std::string::npos ? line.length() : nextSpace;
				boards[boards.size() - 1].m_grid[row][col] = atoi(line.substr(currPos, nextSpace - currPos).c_str());
				currPos = nextSpace + 1;
				++col;
			}
			++row;
		}

		std::stringstream ss(numberList);
		std::string numberstr;

		bool gameEnd = false;
		while (std::getline(ss, numberstr, ',') && !gameEnd) {
			int number = atoi(numberstr.c_str());
			for (Board& b : boards) {
				if (b.MarkNumber(number)) {
					int sum = b.GetSum();
					std::cout << sum * number;
					gameEnd = true;
					break;
				}
			}
		}
	}

	inline void P2() {
		std::ifstream file("E:/Input.txt");
		std::string numberList;
		std::getline(file, numberList);

		std::vector<Board> boards;
		std::string line;
		size_t row = 0;
		size_t boardIdx = 0;
		while (std::getline(file, line)) {
			if (line == "") {
				row = 0;
				boardIdx = boards.size();
				boards.push_back(Board());
				continue;
			}

			size_t currPos = 0;
			size_t col = 0;
			while (currPos < line.length())
			{
				size_t nextSpace = line.find(' ', currPos);
				while (currPos == nextSpace) { // swallow multiple spaces
					++currPos;
					nextSpace = line.find(' ', currPos);
				}

				nextSpace = nextSpace == std::string::npos ? line.length() : nextSpace;
				boards[boards.size() - 1].m_grid[row][col] = atoi(line.substr(currPos, nextSpace - currPos).c_str());
				currPos = nextSpace + 1;
				++col;
			}
			++row;
		}

		std::stringstream ss(numberList);
		std::string numberstr;

		bool gameEnd = false;
		while (std::getline(ss, numberstr, ',') && !gameEnd) {
			int number = atoi(numberstr.c_str());

			for (auto it = boards.begin(); it != boards.end();) {
				it->MarkNumber(number);
				if (it->MarkNumber(number)) {
					if (boards.size() > 1) {
						it = boards.erase(it);
					}
					else {
						int sum = it->GetSum();
						std::cout << sum * number;
						gameEnd = true;
						break;
					}
				}
				else {
					++it;
				}
			}
		}
	}
};

