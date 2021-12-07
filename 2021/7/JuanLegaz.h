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

class C2021E7
{
public:
	inline void P1() {
		std::ifstream file("E:/Input.txt");
		std::string num;

		std::multiset<int> crabs;
		while (std::getline(file, num, ',')) {
			int position = atoi(num.c_str());
			crabs.insert(position);
		}

		auto it = crabs.begin();
		std::advance(it, crabs.size() / 2);
		int median = *it;

		int fuel = 0;
		for (const int pos : crabs) {
			fuel += std::abs(pos - median);
		}

		std::cout << fuel;
	}

	inline void P2() {
		std::ifstream file("E:/Input.txt");
		std::string num;

		std::vector<int> crabs;
		float total = 0;
		while (std::getline(file, num, ',')) {
			int position = atoi(num.c_str());
			crabs.push_back(position);
			total += position;
		}

		int averageCeil = std::ceil(total / crabs.size());
		int averagefloor = std::floor(total / crabs.size());

		int totalFuelC = 0;
		int totalFuelF = 0;
		for (const int pos : crabs) {
			int stepsCeil = std::abs(pos - averageCeil);
			int stepsFloor = std::abs(pos - averagefloor);
			totalFuelC += stepsCeil * (stepsCeil + 1) / 2;
			totalFuelF += stepsFloor * (stepsFloor + 1) / 2;
		}

		std::cout << (totalFuelC > totalFuelF ? totalFuelF : totalFuelC);
	}

};