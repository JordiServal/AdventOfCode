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

constexpr uint32_t literal_packet_size = 18;
class C2021E16
{
public:
	struct BitBuffer {
		BitBuffer(std::unique_ptr<char[]>&& i_buffer) : m_buffer(std::move(i_buffer))
		{}

		std::unique_ptr<char[]> m_buffer;
		uint64_t m_offset = 0;

		uint64_t Read(size_t i_bits) {
			uint64_t readValue = 0;
			for (size_t i = 0; i < i_bits; ++i) {
				char byte = m_buffer[(m_offset + i) / 8];
				size_t focusBitPos = 7 - ((m_offset + i) % 8);
				bool maskedBitValue = (byte & (1 << focusBitPos)) != 0;

				readValue |= maskedBitValue << (i_bits - i - 1);
			}

			m_offset += i_bits;
			return readValue;
		}

		void Skip(size_t i_bits) {
			m_offset += i_bits;
		}
	};

	struct packet_header {
		uint8_t m_version;
		uint8_t m_typeId;


		void Read(BitBuffer& buffer) {
			m_version = buffer.Read(3);
			m_typeId = buffer.Read(3);
		}
	};

	struct literal_packet {
		uint64_t m_value;

		void Read(BitBuffer& buffer) {
			std::queue<uint8_t> numberPieces;
			while (buffer.Read(1)) {
				numberPieces.push(buffer.Read(4));
			}
			m_value = buffer.Read(4);

			while (numberPieces.size() > 0) {
				m_value |= static_cast<uint64_t>(numberPieces.front()) << (numberPieces.size() * 4);
				numberPieces.pop();
			}
		}
	};

	enum class LengthType : bool {
		BITS = 0,
		PACKETS = 1
	};

	struct packet;
	struct operator_packet {
		LengthType m_lengthType;
		uint32_t m_lengthValue;
		uint32_t m_numPackets;
		packet* m_packets;


		void Read(BitBuffer& buffer) {
			m_lengthType = static_cast<LengthType>(buffer.Read(1));
			m_lengthValue = buffer.Read(m_lengthType == LengthType::BITS ? 15 : 11);

			if (m_lengthType == LengthType::BITS) {
				size_t currentOffset = buffer.m_offset;
				std::vector<packet*> subPackets;
				while (buffer.m_offset - currentOffset < m_lengthValue) {
					packet* subPacket = new packet;
					subPacket->Read(buffer);
					subPackets.push_back(subPacket);
				}

				m_numPackets = subPackets.size();
				m_packets = new packet[m_numPackets];
				for (int i = 0; i < m_numPackets; ++i) {
					m_packets[i] = *subPackets[i];
				}
			}
			else if (m_lengthType == LengthType::PACKETS) {
				m_numPackets = 0;
				m_packets = new packet[m_lengthValue];
				while (m_numPackets < m_lengthValue) {
					m_packets[m_numPackets].Read(buffer);
					++m_numPackets;
				}
			}
		}
	};

	union packet_content {
		literal_packet m_literal;
		operator_packet m_operator;
	};

	struct packet {
		packet_header m_header;
		packet_content m_contents;

		void Read(BitBuffer& buffer) {
			m_header.Read(buffer);

			if (m_header.m_typeId == 4) {
				m_contents.m_literal.Read(buffer);
			}

			if (m_header.m_typeId != 4) {
				m_contents.m_operator.Read(buffer);
			}
		}

		void SumVersions(int& sum) {
			sum += m_header.m_version;

			if (m_header.m_typeId != 4) {
				for (uint32_t i = 0; i < m_contents.m_operator.m_numPackets; ++i) {
					m_contents.m_operator.m_packets[i].SumVersions(sum);
				}
			}
		}

		int64_t Resolve() {
			int64_t res;
			switch (m_header.m_typeId) {
			case 0:
				res = 0;
				for (uint32_t i = 0; i < m_contents.m_operator.m_numPackets; ++i) {
					res += m_contents.m_operator.m_packets[i].Resolve();
				}
				break;
			case 1:
				res = 1;
				for (uint32_t i = 0; i < m_contents.m_operator.m_numPackets; ++i) {
					res *= m_contents.m_operator.m_packets[i].Resolve();
				}
				break;
			case 2:
				res = INT64_MAX;
				for (uint32_t i = 0; i < m_contents.m_operator.m_numPackets; ++i) {
					res = min(res, m_contents.m_operator.m_packets[i].Resolve());
				}
				break;
			case 3:
				res = INT64_MIN;
				for (uint32_t i = 0; i < m_contents.m_operator.m_numPackets; ++i) {
					res = max(res, m_contents.m_operator.m_packets[i].Resolve());
				}
				break;
			case 4:
				return m_contents.m_literal.m_value;
				break;
			case 5:
				res = m_contents.m_operator.m_packets[0].Resolve() > m_contents.m_operator.m_packets[1].Resolve();
				break;
			case 6:
				res = m_contents.m_operator.m_packets[0].Resolve() < m_contents.m_operator.m_packets[1].Resolve();
				break;
			case 7:
				res = m_contents.m_operator.m_packets[0].Resolve() == m_contents.m_operator.m_packets[1].Resolve();
				break;
			}

			return res;
		}

		~packet() {
			if (m_header.m_typeId != 4) {
				delete[] m_contents.m_operator.m_packets;
			}
		}

	};


	inline int64_t P1() {
		std::ifstream file("E:/InputE16.bin", std::ios::binary);

		BitBuffer buffer(std::make_unique<char[]>(1024));

		file.read(buffer.m_buffer.get(), 1024);

		packet mainPacket;
		mainPacket.Read(buffer);

		int sum = 0;
		mainPacket.SumVersions(sum);
		return sum;
	}

	inline int64_t P2() {
		std::ifstream file("E:/InputE16.bin", std::ios::binary);

		BitBuffer buffer(std::make_unique<char[]>(2048));

		file.read(buffer.m_buffer.get(), 2048);

		packet mainPacket;
		mainPacket.Read(buffer);

		int64_t res = mainPacket.Resolve();
		return res;
	}
};