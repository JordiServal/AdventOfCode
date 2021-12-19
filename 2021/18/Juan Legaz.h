#pragma once

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <set>
#include <map>
#include <cassert>
#include <tuple>
#include <cmath>
#include <bitset>
#include <queue>
#include <stack>
#include <algorithm>
#include <array>
#include <list>
#include <intsafe.h>

class C2021E18
{
public:
	enum class ElementType : int8_t {
		None = 0,
		Integral = 1,
		SnailFishNumber = 2
	};
	struct SnailFishElement;
	using LinkedPair = std::pair<std::list<SnailFishElement>::iterator, std::list<SnailFishElement>::iterator>;


	struct SnailFishElement {

	public:
		SnailFishElement() = default;

		ElementType m_type = ElementType::None;
		SnailFishElement* m_parent;
	private:
		int m_number;
		LinkedPair m_pair;

	public:
		int GetDepth() {
			if (m_parent == nullptr) {
				return 0;
			}
			else {
				return m_parent->GetDepth() + 1;
			}
		}

		int GetNumber() const {
			assert(m_type == ElementType::Integral);
			return m_number;
		}

		void SetNumber(int number) {
			m_number = number;
			m_type = ElementType::Integral;
		}

		void AddNumber(int number) {
			m_number += number;
			m_type = ElementType::Integral;
		}

		bool isPure() const {
			return m_pair.first->m_type == ElementType::Integral && m_pair.second->m_type == ElementType::Integral;
		}

		void GetSnailFishPair(LinkedPair& elem) const {
			assert(m_type == ElementType::SnailFishNumber);
			elem = m_pair;
		}

		void SetSnailFishPairFirst(const std::list<SnailFishElement>::iterator& elem) {
			elem->m_parent = this;
			m_pair.first = elem;
			m_type = ElementType::SnailFishNumber;
		}

		void SetSnailFishPairSecond(const std::list<SnailFishElement>::iterator& elem) {
			elem->m_parent = this;
			m_pair.second = elem;
			m_type = ElementType::SnailFishNumber;
		}

		int64_t GetMagnitude() const {
			if (m_type == ElementType::Integral) {
				return GetNumber();
			}
			else {
				return m_pair.first->GetMagnitude() * 3 + m_pair.second->GetMagnitude() * 2;
			}
		}
	};


	void ResolveSum(std::list<SnailFishElement>& snailFishContainer) {
		bool resolving = true;
		while (resolving) {
			bool exploding = false;
			bool splitting = false;
			auto it = snailFishContainer.begin();
			for (; it != snailFishContainer.end(); ++it) {

				if (it->m_type == ElementType::SnailFishNumber && it->isPure() && it->GetDepth() >= 4) {
					LinkedPair pair;
					it->GetSnailFishPair(pair);


					auto leftIntegral = it;
					while (leftIntegral != snailFishContainer.begin() && leftIntegral->m_type != ElementType::Integral) {
						leftIntegral--;
					}
					auto rightIntegral = pair.second;
					rightIntegral++;
					while (rightIntegral != snailFishContainer.end() && rightIntegral->m_type != ElementType::Integral) {
						rightIntegral++;
					}

					if (leftIntegral != snailFishContainer.begin()) {
						leftIntegral->AddNumber(pair.first->GetNumber());
					}
					if (rightIntegral != snailFishContainer.end()) {
						rightIntegral->AddNumber(pair.second->GetNumber());
					}

					snailFishContainer.erase(pair.first);
					snailFishContainer.erase(pair.second);

					it->SetNumber(0);
					it = snailFishContainer.begin();
					exploding = true;
				}
			}


			it = snailFishContainer.begin();
			for (; it != snailFishContainer.end(); ++it) {
				if (it->m_type == ElementType::Integral && it->GetNumber() >= 10) {
					SnailFishElement split;

					float half = it->GetNumber() / 2.f;

					SnailFishElement p1, p2;
					p1.SetNumber(std::floor(half));
					p2.SetNumber(std::ceil(half));

					auto insertPos = it;
					insertPos++;

					snailFishContainer.insert(insertPos, p2);
					insertPos--;
					it->SetSnailFishPairSecond(insertPos);
					snailFishContainer.insert(insertPos, p1);
					insertPos--;
					it->SetSnailFishPairFirst(insertPos);
					splitting = true;
					break;
				}
			}

			resolving = exploding || splitting;
		}
	}

	void Print(const SnailFishElement& snailFishElement) {
		if (snailFishElement.m_type == ElementType::Integral) {
			std::cout << snailFishElement.GetNumber();
		}
		else {
			LinkedPair pair;
			snailFishElement.GetSnailFishPair(pair);
			std::cout << '[';
			Print(*pair.first);
			std::cout << ',';
			Print(*pair.second);
			std::cout << ']';
		}
	}

	inline int64_t P1() {
		std::ifstream file("E:/InputE18.txt");
		std::string line;

		std::list<SnailFishElement> snailfishContainer;

		std::vector<std::list<SnailFishElement>::iterator> rootSnails;
		while (std::getline(file, line)) {
			assert(line[0] == '[');

			snailfishContainer.emplace_back();
			auto it = snailfishContainer.end();
			it--;
			rootSnails.push_back(it);

			bool secondElement = false;

			std::stack<std::list<SnailFishElement>::iterator> stack;
			stack.push(it);
			for (int i = 1; i < line.length(); ++i) {
				if (line[i] == ',') {
					secondElement = true;
					continue;
				}

				if (line[i] == '[') {
					snailfishContainer.emplace_back();
					auto it = snailfishContainer.end();
					it--;
					secondElement ?
						stack.top()->SetSnailFishPairSecond(it) :
						stack.top()->SetSnailFishPairFirst(it);

					stack.push(it);
				}
				else if (line[i] == ']') {
					stack.pop();
				}
				else {
					snailfishContainer.emplace_back();

					auto it = snailfishContainer.end();
					it--;
					secondElement ?
						stack.top()->SetSnailFishPairSecond(it) :
						stack.top()->SetSnailFishPairFirst(it);

					it->SetNumber(line[i] - '0');
				}

				secondElement = false;
			}

			if (rootSnails.size() == 2) {
				snailfishContainer.emplace_front();
				auto newElement = snailfishContainer.begin();
				newElement->SetSnailFishPairFirst(rootSnails[0]);
				newElement->SetSnailFishPairSecond(rootSnails[1]);

				rootSnails.clear();
				rootSnails.push_back(newElement);

				ResolveSum(snailfishContainer);
			}
		}


		return snailfishContainer.begin()->GetMagnitude();
	}


	void CopyList(const SnailFishElement& src, std::stack<std::list<SnailFishElement>::iterator>& stack, bool second, std::list<SnailFishElement>& dest) {
		if (src.m_type == ElementType::Integral) {
			dest.emplace_back();
			auto it = dest.end();
			it--;
			it->SetNumber(src.GetNumber());
			second ?
				stack.top()->SetSnailFishPairSecond(it) :
				stack.top()->SetSnailFishPairFirst(it);
		}
		else {
			dest.emplace_back();
			auto it = dest.end();
			it--;

			if (stack.size() > 0) {
				second ?
					stack.top()->SetSnailFishPairSecond(it) :
					stack.top()->SetSnailFishPairFirst(it);
			}

			stack.push(it);

			LinkedPair pair;
			src.GetSnailFishPair(pair);
			CopyList(*pair.first, stack, false, dest);
			CopyList(*pair.second, stack, true, dest);

			stack.pop();
		}
	}


	int64_t SumChains(const std::list<SnailFishElement>& c1, const std::list<SnailFishElement>& c2) {
		std::list<SnailFishElement> combined;
		std::stack<std::list<SnailFishElement>::iterator> stack;
		CopyList(*c1.cbegin(), stack, false, combined);

		auto c2Root = combined.end();
		c2Root--;
		stack = std::stack<std::list<SnailFishElement>::iterator>();
		CopyList(*c2.cbegin(), stack, false, combined);
		c2Root++;

		auto c1Root = combined.begin();

		combined.emplace_front();
		auto newElement = combined.begin();
		newElement->SetSnailFishPairFirst(c1Root);
		newElement->SetSnailFishPairSecond(c2Root);

		ResolveSum(combined);

		return combined.begin()->GetMagnitude();
	}

	inline int64_t P2() {
		std::ifstream file("E:/InputE18.txt");
		std::string line;

		std::list<std::list<SnailFishElement>> snailfishChains;

		while (std::getline(file, line)) {
			assert(line[0] == '[');

			snailfishChains.emplace_back();
			std::list<SnailFishElement>& snailfishContainer = snailfishChains.back();
			snailfishContainer.emplace_back();
			auto it = snailfishContainer.end();
			it--;

			bool secondElement = false;

			std::stack<std::list<SnailFishElement>::iterator> stack;
			stack.push(it);
			for (int i = 1; i < line.length(); ++i) {
				if (line[i] == ',') {
					secondElement = true;
					continue;
				}

				if (line[i] == '[') {
					snailfishContainer.emplace_back();
					auto it = snailfishContainer.end();
					it--;
					secondElement ?
						stack.top()->SetSnailFishPairSecond(it) :
						stack.top()->SetSnailFishPairFirst(it);

					stack.push(it);
				}
				else if (line[i] == ']') {
					stack.pop();
				}
				else {
					snailfishContainer.emplace_back();

					auto it = snailfishContainer.end();
					it--;
					secondElement ?
						stack.top()->SetSnailFishPairSecond(it) :
						stack.top()->SetSnailFishPairFirst(it);

					it->SetNumber(line[i] - '0');
				}

				secondElement = false;
			}
		}

		int64_t maxMagnitude = 0;
		for (auto& list : snailfishChains) {
			for (auto& list2 : snailfishChains) {
				if (&list == &list2) {
					continue;
				}

				int sumMag = SumChains(list, list2);
				maxMagnitude = max(maxMagnitude, sumMag);
			}
		}

		return maxMagnitude;
	}
};