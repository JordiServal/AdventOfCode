#pragma once

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <array>
#include <tuple>
#include <cmath>
#include <cassert>


class C2021E6
{
public:
	inline void P1() {
		std::ifstream file("E:/Input.txt");
		std::string num;

		std::array<int, 9> fishProduction;
		fishProduction.fill(0);
		while (std::getline(file, num, ',')) {
			fishProduction[atoi(num.c_str())]++;
		}

		constexpr size_t max_days = 80;
		for (size_t i = 0; i < max_days; ++i) {
			fishProduction[(i + 7) % 9] += fishProduction[i % 9];
		}

		int total = 0;
		for (const auto fishes : fishProduction) {
			total += fishes;
		}

		std::cout << total;
	}


	inline void P2() {
		std::ifstream file("E:/Input.txt");
		std::string num;

		std::array<uint64_t, 9> fishProduction;
		fishProduction.fill(0);
		while (std::getline(file, num, ',')) {
			fishProduction[atoi(num.c_str())]++;
		}

		constexpr size_t max_days = 256;
		for (size_t i = 0; i < max_days; ++i) {
			fishProduction[(i + 7) % 9] += fishProduction[i % 9];
		}

		uint64_t total = 0;
		for (const auto fishes : fishProduction) {
			total += fishes;
		}

		std::cout << total;
	}

};