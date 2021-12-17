#pragma once

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <set>
#include <map>
#include <unordered_map>
#include <tuple>
#include <cmath>
#include <bitset>
#include <queue>
#include <stack>
#include <algorithm>
#include <array>
#include <list>
#include <intsafe.h>

class C2021E15
{
public:

	struct NavNode {
		NavNode(uint16_t x, uint16_t y, uint16_t i_traversalCost)
			: m_x(x), m_y(y), m_traversalCost(i_traversalCost)
		{}

		uint16_t m_x;
		uint16_t m_y;
		bool m_visited = false;
		bool m_selected = false;
		uint16_t m_traversalCost;
		size_t m_distanceToOrigin = SIZE_T_MAX;
		size_t m_directDistanceToGoal = SIZE_T_MAX;
		const NavNode* m_prevNode = nullptr;
	};


	template<typename T>
	void AStarStep(const NavNode& currNode, const NavNode& goalNode, std::vector<std::vector<NavNode>>& navNodes, std::priority_queue<NavNode*,std::vector<NavNode*>,T>& pendingNodes) {
		if (currNode.m_distanceToOrigin >= goalNode.m_distanceToOrigin || currNode.m_visited) {
			return;
		}

		for (int i = -1; i <= 1; ++i) {
			if (currNode.m_x + i < 0 || currNode.m_x + i == navNodes.size()) {
				continue;
			}
			for (int j = -1; j <= 1; ++j) {
				if (currNode.m_y + j < 0 || currNode.m_y + j == navNodes[currNode.m_x + i].size() || std::abs(i + j) != 1 || navNodes[currNode.m_x + i][currNode.m_y + j].m_visited) {
					continue;
				}

				NavNode& evaluatingNode = navNodes[currNode.m_x + i][currNode.m_y + j];
				if (evaluatingNode.m_directDistanceToGoal == SIZE_T_MAX) {
					evaluatingNode.m_directDistanceToGoal = std::abs((evaluatingNode.m_x + evaluatingNode.m_y) - (goalNode.m_x + goalNode.m_y));
				}

				if (currNode.m_distanceToOrigin + evaluatingNode.m_traversalCost < evaluatingNode.m_distanceToOrigin) {
					evaluatingNode.m_prevNode = &currNode;
					evaluatingNode.m_distanceToOrigin = currNode.m_distanceToOrigin + evaluatingNode.m_traversalCost;
				}

				if (evaluatingNode.m_distanceToOrigin < goalNode.m_distanceToOrigin) {
					pendingNodes.push(&evaluatingNode);
				}
			}
		}
	}

	inline int64_t P1() {
		std::ifstream file("E:/InputE15.txt");
		std::string line;
		std::vector<std::vector<NavNode>> navNodes;

		while (std::getline(file, line)) {
			std::vector<NavNode> row;
			row.reserve(line.length());
			for (const char c : line) {
				row.emplace_back(static_cast<uint16_t>(navNodes.size()), static_cast<uint16_t>(row.size()), c - '0');
			}

			navNodes.push_back(row);
		}

		NavNode& start = navNodes.front().front();
		start.m_distanceToOrigin = 0;
		const NavNode& goal = navNodes.back().back();

		auto comparer = [](NavNode* n1, NavNode* n2) -> bool {return n1->m_distanceToOrigin + n1->m_directDistanceToGoal >= n2->m_distanceToOrigin + n2->m_directDistanceToGoal; };
		std::priority_queue<NavNode*, std::vector<NavNode*>, decltype(comparer)> toVisit(comparer);
		toVisit.push(&navNodes.front().front());

		while (toVisit.size() > 0) {
			NavNode* visitingNode = toVisit.top();
			toVisit.pop();
			AStarStep(*visitingNode, goal, navNodes, toVisit);
			visitingNode->m_visited = true;
		}

		return goal.m_distanceToOrigin;
	}

	inline int64_t P2() {
		std::ifstream file("E:/InputE15.txt");
		std::string line;
		std::vector<std::vector<NavNode>> navNodes;

		while (std::getline(file, line)) {
			std::vector<NavNode> row;
			row.reserve(line.length() * 5);
			for (const char c : line) {
				row.emplace_back(static_cast<uint16_t>(navNodes.size()), static_cast<uint16_t>(row.size()), c - '0');
			}
			navNodes.push_back(row);
		}

		std::pair<size_t, size_t> originalSize = std::make_pair(navNodes.size(), navNodes[0].size());
		std::vector<NavNode> row;
		row.reserve(originalSize.second * 5);
		navNodes.resize(originalSize.first * 5, row);

		for (size_t i = 0; i < 5; ++i) {
			size_t baseRowIdx = originalSize.first * i;

			for (size_t j = 0; j < 5; ++j) {
				size_t baseColIdx = originalSize.second * j;
				if (j == i && i == 0) {
					continue;
				}

				for (size_t origI = 0; origI < originalSize.first; ++origI) {
					for (size_t origJ = 0; origJ < originalSize.second; ++origJ) {
						int newCost = navNodes[origI][origJ].m_traversalCost + i + j;
						newCost = ((newCost - 1) % 9) + 1;
						navNodes[baseRowIdx + origI].emplace_back(static_cast<uint16_t>(baseRowIdx + origI), static_cast<uint16_t>(baseColIdx + origJ), newCost);
					}
				}
			}
		}

		NavNode& start = navNodes.front().front();
		start.m_distanceToOrigin = 0;
		NavNode& goal = navNodes.back().back();

		auto comparer = [](NavNode* n1, NavNode* n2) -> bool {return n1->m_distanceToOrigin + n1->m_directDistanceToGoal > n2->m_distanceToOrigin + n2->m_directDistanceToGoal; };
		std::priority_queue<NavNode*, std::vector<NavNode*>, decltype(comparer)> toVisit(comparer);
		toVisit.push(&start);

		while (toVisit.size() > 0) {
			NavNode* visitingNode = toVisit.top();
			toVisit.pop();
			AStarStep(*visitingNode, goal, navNodes, toVisit);
			visitingNode->m_visited = true;
		}

		return goal.m_distanceToOrigin;
	}
};