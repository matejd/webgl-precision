#include "renderer.hpp"

#include <GL/glew.h>
#include <GL/glfw.h>

// stblib image loading library, single-file, public domain
// https://code.google.com/p/stblib/
#define STBI_HEADER_FILE_ONLY
#include "stb_image.cpp"

#include <iostream>
#include <sstream>
#include <unordered_map>
#include <cassert>
#include <cmath>

struct Mesh {
    GLuint vbid;
    GLuint ibid;
    GLsizei numIndices;
};

struct Shader {
    GLuint id;
    std::unordered_map<std::string, GLint> uniforms;
};

struct Texture {
    GLuint id;
    int width, height;
};

void checkGLError(const char* file, int line)
{
    const GLenum error = glGetError();
    if (error == GL_NO_ERROR)
        return;
    std::cout << "OpenGL error (" << file << ":" << line << "): ";
    switch (error) {
        case GL_INVALID_ENUM:      std::cout << "invalid enum"; break;
        case GL_INVALID_VALUE:     std::cout << "invalid value"; break;
        case GL_INVALID_OPERATION: std::cout << "invalid operation"; break;
        case GL_STACK_OVERFLOW:    std::cout << "stack overflow"; break;
        case GL_OUT_OF_MEMORY:     std::cout << "out of memory"; break;
        case GL_TABLE_TOO_LARGE:   std::cout << "table too large"; break;
        default:                   std::cout << "unknown"; break;
    }
    std::cout << std::endl;
    assert(false);
}

Renderer::Renderer() {}

Renderer::~Renderer()
{
    for (Shader* shader: shaders) {
        delete shader;
    }

    for (Texture* texture: textures) {
        delete texture;
    }

    for (Mesh* mesh: meshes) {
        delete mesh;
    }
}

ShaderID Renderer::addShaderFromSource(const std::string& vsSource, const std::string& fsSource)
{
    assert(vsSource.size() > 0 && fsSource.size() > 0);
    GLenum types[] = {GL_VERTEX_SHADER, GL_FRAGMENT_SHADER};
    GLuint ids[2];
    for (int i = 0; i < 2; i++) {
        ids[i] = glCreateShader(types[i]);
        const char* ptr = (i == 0) ? &vsSource[0] : &fsSource[0];
        glShaderSource(ids[i], 1, &ptr, nullptr);
        glCompileShader(ids[i]);
        GLint status = 0;
        glGetShaderiv(ids[i], GL_COMPILE_STATUS, &status);
        if (!status) {
            GLchar info[1024];
            GLsizei length = 0;
            glGetShaderInfoLog(ids[i], sizeof(info), &length, info);
            std::cout << "Failed to compile:" << std::endl << info << std::endl;
            assert(false);
            return -1;
        }
    }

    std::vector<std::string> attributes;
    std::vector<std::string> uniforms;
    for (int i = 0; i < 2; i++) {
        std::stringstream ss;
        if (i == 0)
            ss << vsSource;
        else
            ss << fsSource;
        ss.seekp(0);
        std::string token;
        ss >> token;
        while (token != "main" && !ss.eof()) {
            if (token == "uniform") {
                std::string type, name;
                ss >> type >> name;
                name = name.substr(0, name.find_first_of("[ ;"));
                uniforms.push_back(name);
            }
            else if (token == "attribute") {
                std::string type, name;
                ss >> type >> name;
                name = name.substr(0, name.find_first_of("[ ;"));
                attributes.push_back(name);
            }

            ss >> token;
        }
    }

    Shader* shader = new Shader;
    shader->id = glCreateProgram();
    glAttachShader(shader->id, ids[0]);
    glAttachShader(shader->id, ids[1]);
    for (int i = 0; i < attributes.size(); i++) {
        glBindAttribLocation(shader->id, i, attributes[i].c_str());
    }
    glLinkProgram(shader->id);
    GLint linked = 0;
    glGetProgramiv(shader->id, GL_LINK_STATUS, &linked);
    assert(linked);
    for (std::string name : uniforms) {
        shader->uniforms[name] = glGetUniformLocation(shader->id, name.c_str());
        if (shader->uniforms[name] == -1) {
            std::cout << "Failed to get uniform " << name << " location!" << std::endl;
            assert(false);
        }
    }

    shaders.push_back(shader);
    return shaders.size()-1;
}

ShaderID Renderer::addShader(const std::string& vsFilename, const std::string& fsFilename)
{
    std::cout << "Uploading shader " << vsFilename << " + " << fsFilename << std::endl;
    ByteBuffer vsSource = getFileContents(vsFilename);
    ByteBuffer fsSource = getFileContents(fsFilename);
    return addShaderFromSource(vsSource, fsSource);
}

void Renderer::setShader(ShaderID shader)
{
    assert(shader >= 0 && shader < shaders.size());
    glUseProgram(shaders[shader]->id);
    currentShader = shader;
}

void Renderer::setUniform1i(const std::string& name, int value)
{
    Shader* shader = shaders[currentShader];
    assert(shader->uniforms.find(name) != shader->uniforms.end());
    glUniform1i(shader->uniforms[name], value);
}

void Renderer::setUniform1f(const std::string& name, float value)
{
    Shader* shader = shaders[currentShader];
    assert(shader->uniforms.find(name) != shader->uniforms.end());
    glUniform1f(shader->uniforms[name], value);
}

void Renderer::setUniform4x4fv(const std::string& name, int count, const float* value)
{
    Shader* shader = shaders[currentShader];
    assert(shader->uniforms.find(name) != shader->uniforms.end());
    glUniformMatrix4fv(shader->uniforms[name], count, GL_FALSE, value);
}

void Renderer::setUniform3fv(const std::string& name, int count, const float* value)
{
    Shader* shader = shaders[currentShader];
    assert(shader->uniforms.find(name) != shader->uniforms.end());
    glUniform3fv(shader->uniforms[name], count, value);
}

void Renderer::setUniform4fv(const std::string& name, int count, const float* value)
{
    Shader* shader = shaders[currentShader];
    assert(shader->uniforms.find(name) != shader->uniforms.end());
    glUniform4fv(shader->uniforms[name], count, value);
}

void Renderer::setUniform2fv(const std::string& name, int count, const float* value)
{
    Shader* shader = shaders[currentShader];
    assert(shader->uniforms.find(name) != shader->uniforms.end());
    glUniform2fv(shader->uniforms[name], count, value);
}

void Renderer::setTexture(int unit, TextureID id)
{
    assert(unit >= 0);
    assert(id >= 0 && id < textures.size());
    Texture* texture = textures[id];
    glActiveTexture(GL_TEXTURE0+unit);
    glBindTexture(GL_TEXTURE_2D, texture->id);
}

MeshID Renderer::addMesh(const std::string& filename)
{
    std::cout << "Uploading mesh " << filename << std::endl;
    ByteBuffer buffer = getFileContents(filename);
    int numVertices, numIndices;
    numVertices = *reinterpret_cast<int*>(&buffer[0]);
    numIndices  = *reinterpret_cast<int*>(&buffer[sizeof(int)]);
    std::cout << "numVertices: " << numVertices << std::endl;
    std::cout << "numIndices: " << numIndices << std::endl;

    Mesh* mesh = new Mesh;
    mesh->numIndices = numIndices;
    int vpos = 2*sizeof(int);
    int ipos = 2*sizeof(int)+numVertices*sizeof(Vertex);

    glGenBuffers(1, &mesh->vbid);
    glBindBuffer(GL_ARRAY_BUFFER, mesh->vbid);
    glBufferData(GL_ARRAY_BUFFER, numVertices * sizeof(Vertex), &buffer[vpos], GL_STATIC_DRAW);
    glBindBuffer(GL_ARRAY_BUFFER, 0);

    glGenBuffers(1, &mesh->ibid);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh->ibid);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, numIndices * sizeof(Index), &buffer[ipos], GL_STATIC_DRAW);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);

    meshes.push_back(mesh);
    return meshes.size()-1;
}

void Renderer::drawMesh(MeshID id)
{
    assert(id >= 0 && id < meshes.size());

    Mesh* mesh = meshes[id];
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh->ibid);
    glBindBuffer(GL_ARRAY_BUFFER,         mesh->vbid);
    glEnableVertexAttribArray(0);
    glEnableVertexAttribArray(1);
    glEnableVertexAttribArray(2);
    glEnableVertexAttribArray(3);
    glEnableVertexAttribArray(4);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex), reinterpret_cast<GLvoid*>(0));
    glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex), reinterpret_cast<GLvoid*>(3*sizeof(float)));
    glVertexAttribPointer(2, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex), reinterpret_cast<GLvoid*>(6*sizeof(float)));
    glVertexAttribPointer(3, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex), reinterpret_cast<GLvoid*>(9*sizeof(float)));
    glVertexAttribPointer(4, 2, GL_FLOAT, GL_FALSE, sizeof(Vertex), reinterpret_cast<GLvoid*>(12*sizeof(float)));
    //glDrawElements(GL_TRIANGLES, mesh->numIndices, GL_UNSIGNED_SHORT, 0);
    glDrawElements(GL_TRIANGLES, mesh->numIndices, GL_UNSIGNED_INT, 0);
    glDisableVertexAttribArray(0);
    glDisableVertexAttribArray(1);
    glDisableVertexAttribArray(2);
    glDisableVertexAttribArray(3);
    glDisableVertexAttribArray(4);
}

TextureID Renderer::addTexture(const std::string& filename, PixelFormat internal, PixelFormat input, PixelType type)
{
    // Supported HDR image formats:
    // - Greg Ward's Radiance "shared exponent" HDR image format (RGBE)
    //
    // Some notes about WebGL's texture format:
    // A post from https://code.google.com/p/chromium/issues/detail?id=260064
    //
    // D3D11 does not support DXGI_FORMAT_R32G32B32_FLOAT for "Shader sample with any filter type".
    // See the table with that title here: http://msdn.microsoft.com/en-us/library/windows/desktop/cc627091(v=vs.85).aspx
    // So ANGLE doesn't advertise the OES_texture_float_linear extension because
    // the GL_RGB/GL_FLOAT combination isn't available with filtering.
    // Can ANGLE maybe do what the D3D9 version did and use DXGI_FORMAT_R32G32B32A32_FLOAT and
    // put padding in the alpha channel? It seems a shame to lose GL_RGBA/GL_FLOAT because
    // GL_RGB/GL_FLOAT isn't available.
    std::cout << "Uploading texture " << filename << std::endl;

    assert(internal == input);

    int numChannels = 1;
    GLenum glInternal;
    GLenum glInput;
    if (internal == PixelFormat::R) {
        numChannels = 1;
        glInternal = GL_LUMINANCE;
    }
    else if (internal == PixelFormat::Rgb) {
        numChannels = 3;
        glInternal = GL_RGB;
    }
    else if (internal == PixelFormat::Rgba) {
        numChannels = 4;
        glInternal = GL_RGBA;
    }
    else
        assert(false);

    glInput = glInternal;

    GLenum glType;
    if (type == PixelType::Float)
        glType = GL_FLOAT;
    else if (type == PixelType::Ubyte)
        glType = GL_UNSIGNED_BYTE;
    else
        assert(false);

    // Delegate all the hard work to the fantastic stb_image
    int width, height, n;
    u8* data = stbi_load(filename.c_str(), &width, &height, &n, numChannels);
    if (data == nullptr) {
        std::cout << stbi_failure_reason() << std::endl;
        assert(false);
    }
    assert(n == numChannels);

    Texture* tex = new Texture;
    glGenTextures(1, &tex->id);
    glBindTexture(GL_TEXTURE_2D, tex->id);
    glTexImage2D(GL_TEXTURE_2D, 0, glInternal, width, height, 0, glInput, glType, data);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    stbi_image_free(data);
    textures.push_back(tex);
    return textures.size()-1;
}
