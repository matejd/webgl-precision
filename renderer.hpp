#ifndef __RENDERER_HPP__
#define __RENDERER_HPP__

#include "common.hpp"

#include <string>
#include <vector>

struct Vertex {
    float px,py,pz;
    float nx,ny,nz;
    float tx,ty,tz;
    float bx,by,bz;
    float u,v;
};

//typedef u16 Index;
typedef u32 Index;

#define CGLE checkGLError(__FILE__, __LINE__)
void checkGLError(const char* file, int line);

typedef int TextureID;
typedef int ShaderID;
typedef int MeshID;

struct Texture;
struct Shader;
struct Mesh;

enum class PixelFormat {
    R,
    Rgb,
    Rgba
};

enum class PixelType {
    Ubyte,
    Float
};

class Renderer {
public:
    Renderer();
    ~Renderer();

    TextureID addTexture(const std::string& filename, PixelFormat internal, PixelFormat input, PixelType type);
    ShaderID addShader(const std::string& vsFilename, const std::string& fsFilename);
    ShaderID addShaderFromSource(const std::string& vsSource, const std::string& fsSource);
    MeshID addMesh(const std::string& filename);

    void setShader(ShaderID shader);
    void setUniform1i(const std::string& name, int value);
    void setUniform1f(const std::string& name, float value);
    void setUniform2fv(const std::string& name, int count, const float* value);
    void setUniform3fv(const std::string& name, int count, const float* value);
    void setUniform4fv(const std::string& name, int count, const float* value);
    void setUniform4x4fv(const std::string& name, int count, const float* value);

    void setTexture(int unit, TextureID id);

    void drawMesh(MeshID id);

private:
    std::vector<Texture*> textures;
    std::vector<Shader*> shaders;
    std::vector<Mesh*> meshes;

    ShaderID currentShader;
};

#endif
