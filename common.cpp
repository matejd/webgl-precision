#include "common.hpp"

#include <iostream>
#include <fstream>
#include <cassert>

ByteBuffer getFileContents(const std::string& filename)
{
    /// Returns the contents of the entire file.
    std::ifstream in(filename, std::ios::in | std::ios::binary);
    if (in)
    {
        ByteBuffer contents;
        in.seekg(0, std::ios::end);
        contents.resize(in.tellg());
        in.seekg(0, std::ios::beg);
        in.read(&contents[0], contents.size());
        in.close();
        return contents;
    }
    else {
        std::cout << "Failed to read " << filename << "!" << std::endl;
        assert(false);
        return ByteBuffer();
    }
}
