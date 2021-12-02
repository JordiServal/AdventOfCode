#pragma once

#include <iostream>
#include <fstream>
#include <string>

class C2021E2
{
public:

	inline void P1() {
		std::ifstream file("E:/Input.txt");

		int hPos = 0;
		int depth = 0;
		std::string line;
		while (std::getline(file, line)) {
			size_t tokenIdx = line.find(' ');
			std::string cmd = line.substr(0, tokenIdx);
			int amount = atoi(line.substr(tokenIdx + 1, line.length()).c_str());
			if (cmd.compare("forward") == 0) {
				hPos += amount;
			}
			else if (cmd.compare("down") == 0) {
				depth += amount;
			}
			else if (cmd.compare("up") == 0) {
				depth -= amount;
			}
		}
		std::cout << hPos * depth;
	}

	inline void P2() {
		std::ifstream file("E:/Input.txt");

		int hPos = 0;
		int depth = 0;
		int aim = 0;
		std::string line;
		while (std::getline(file, line)) {
			size_t tokenIdx = line.find(' ');
			std::string cmd = line.substr(0, tokenIdx);
			int amount = atoi(line.substr(tokenIdx + 1, line.length()).c_str());
			if (cmd.compare("forward") == 0) {
				hPos += amount;
				depth += aim * amount;
			}
			else if (cmd.compare("down") == 0) {
				aim += amount;
			}
			else if (cmd.compare("up") == 0) {
				aim -= amount;
			}
		}
		std::cout << hPos * depth;
	}
};

