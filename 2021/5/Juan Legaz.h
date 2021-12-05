#pragma once

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <set>
#include <tuple>
#include <cmath>
#include <cassert>


class C2021E5
{
public:
	inline void P1() {
		std::ifstream file("E:/Input.txt");
		std::string line;
		std::set<std::tuple<size_t, size_t>> occupiedCells;
		std::set<std::tuple<size_t, size_t>> repeatedCells;

		while (std::getline(file, line)) {
			std::stringstream ssLine(line);
			size_t sepIdx = line.find("-");
			std::string fromStr = line.substr(0, sepIdx - 1); // remove last ' '
			std::string toStr = line.substr(sepIdx + 3, line.size()); // need to skip '-', '>' and ' '

			std::stringstream ss(fromStr);
			std::string value;

			std::getline(ss, value, ',');
			int frX = atoi(value.c_str());
			std::getline(ss, value, ',');
			int frY = atoi(value.c_str());

			ss = std::stringstream(toStr);
			std::getline(ss, value, ',');
			int toX = atoi(value.c_str());
			std::getline(ss, value, ',');
			int toY = atoi(value.c_str());

			bool xMoving = frX != toX;
			bool yMoving = frY != toY;
			if (xMoving && yMoving) {
				continue;
			}

			size_t fr;
			size_t to;
			size_t fixed;
			if (xMoving) {
				fr = std::min(frX, toX);
				to = std::max(frX, toX);
				fixed = toY;
			}
			else if (yMoving) {
				fr = std::min(frY, toY);
				to = std::max(frY, toY);
				fixed = toX;
			}

			for (size_t i = fr; i <= to; ++i) {
				std::tuple<size_t, size_t> cell = xMoving ? std::make_tuple(i, fixed) : std::make_tuple(fixed, i);

				if (occupiedCells.find(cell) != occupiedCells.end()) {
					repeatedCells.emplace(cell);
				}
				else {
					occupiedCells.emplace(cell);
				}
			}
		}

		std::cout << repeatedCells.size();
	}


	inline void P2() {
		std::ifstream file("E:/Input.txt");
		std::string line;
		std::set<std::tuple<size_t, size_t>> occupiedCells;
		std::set<std::tuple<size_t, size_t>> repeatedCells;

		while (std::getline(file, line)) {
			std::stringstream ssLine(line);
			size_t sepIdx = line.find("-");
			std::string fromStr = line.substr(0, sepIdx - 1); // remove last ' '
			std::string toStr = line.substr(sepIdx + 3, line.size()); // need to skip '-', '>' and ' '

			std::stringstream ss(fromStr);
			std::string value;

			std::getline(ss, value, ',');
			int frX = atoi(value.c_str());
			std::getline(ss, value, ',');
			int frY = atoi(value.c_str());

			ss = std::stringstream(toStr);
			std::getline(ss, value, ',');
			int toX = atoi(value.c_str());
			std::getline(ss, value, ',');
			int toY = atoi(value.c_str());

			bool xMoving = frX != toX;
			bool yMoving = frY != toY;
			if (xMoving && yMoving) {
				bool negativeX = toX < frX;
				bool negativeY = toY < frY;

				for (int i = 0; i <= std::abs(frX - toX); ++i) {
					size_t coordX = frX + (negativeX ? -i : i);
					size_t coordY = frY + (negativeY ? -i : i);
					std::tuple<size_t, size_t> cell = std::make_tuple(coordX, coordY);

					if (occupiedCells.find(cell) != occupiedCells.end()) {
						repeatedCells.emplace(cell);
					}
					else {
						occupiedCells.emplace(cell);
					}
				}
			}
			else {
				size_t fr;
				size_t to;
				size_t fixed;
				if (xMoving) {
					fr = std::min(frX, toX);
					to = std::max(frX, toX);
					fixed = toY;
				}
				else {
					fr = std::min(frY, toY);
					to = std::max(frY, toY);
					fixed = toX;
				}

				for (size_t i = fr; i <= to; ++i) {
					std::tuple<size_t, size_t> cell = xMoving ? std::make_tuple(i, fixed) : std::make_tuple(fixed, i);

					if (occupiedCells.find(cell) != occupiedCells.end()) {
						repeatedCells.emplace(cell);
					}
					else {
						occupiedCells.emplace(cell);
					}
				}
			}
		}

		std::cout << repeatedCells.size();
	}

};