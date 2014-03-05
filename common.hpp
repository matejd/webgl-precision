#ifndef __COMMON_HPP__
#define __COMMON_HPP__

#include <string>
#include <cstdint>

typedef std::uint8_t  u8;
typedef std::uint16_t u16;
typedef std::uint32_t u32;
static_assert(sizeof(u8)  == 1, "sizeof u8");
static_assert(sizeof(u16) == 2, "sizeof u16");
static_assert(sizeof(u32) == 4, "sizeof u32");

const float PI = 3.141529f;

// Notes:
// C++11 std::string requires contiguous underlying storage,
// passing pointers (e.g., &buffer[0]) is safe.
// 
// std::string == std::basic_string<char>
// std::string is convenient to parse with stringstream
typedef std::string ByteBuffer;

ByteBuffer getFileContents(const std::string& filename);

#endif
