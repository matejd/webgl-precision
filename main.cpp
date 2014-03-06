/// WebGL output display tests
#include "common.hpp"
#include "renderer.hpp"

#include <GL/glew.h>
#include <GL/glfw.h>
#ifdef EMSCRIPTEN
#include <emscripten/emscripten.h>
#endif

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
using namespace glm;

#include <iostream>
#include <iomanip>
#include <fstream>

class App {
public:
    App(int canvasWidth, int canvasHeight): canvasWidth(canvasWidth), canvasHeight(canvasHeight) {}
    ~App();

    bool checkPlatform();
    bool setup();
    void drawFrame();

    void onKey(int key, int action);
    void onChar(int key, int action);
    void onMousePos(int x, int y);
    void onMouseButton(int button, int action);
    void onMouseWheel(int pos);

    // GUI bridge, see below
    void setValue(const std::string& param, const std::string& value);

private:
    int canvasWidth, canvasHeight;
    Renderer* renderer = nullptr;

    GLuint fullTriVB;
    ShaderID displayShader, computeShader;
#ifndef EMSCRIPTEN
    bool displayCpu = false;
    GLuint cpuPrecisionTexture;
#endif
    GLuint framebuffer, colorbuffer;
    bool frameRendered = false;

    std::string cmd, previousCmd;
};

// We can't use C++ methods as GLFW callbacks. Using a global variable and 
// callback chaining as a workaround. I promise this is the only global var!
App* gApp = nullptr;

// We'll export this function to JavaScript (see index.html for usage).
// Its purpose is to be a dat.gui.js <---> C++ bridge.
// When offline, we'll just capture input and call setAppValue on Enter (see onKey and onChar),
// getting stuff done as simply as possible!
extern "C"
void setAppValue(const char* param, const char* value)
{
    assert(gApp != nullptr);
    gApp->setValue(param, value);
}

void App::setValue(const std::string& param, const std::string& value)
{
#ifndef EMSCRIPTEN
    if (param == "displayCpu") {
        displayCpu = (value == "true");
    }
#endif
}

App::~App()
{
    delete renderer;
}

bool App::checkPlatform()
{
    std::cout << "Canvas size: "    << canvasWidth << "x" << canvasHeight << std::endl;
    std::cout << "OpenGL version: " << glGetString(GL_VERSION)                  << std::endl;
    std::cout << "GLSL version: "   << glGetString(GL_SHADING_LANGUAGE_VERSION) << std::endl;
    std::cout << "Vendor: "         << glGetString(GL_VENDOR)                   << std::endl;
    std::cout << "Renderer: "       << glGetString(GL_RENDERER)                 << std::endl;

    GLint maxRenderbufferSize;
    glGetIntegerv(GL_MAX_RENDERBUFFER_SIZE, &maxRenderbufferSize);
    std::cout << "Max renderbuffer size: " << maxRenderbufferSize << std::endl;
    assert(canvasWidth <= maxRenderbufferSize && canvasHeight <= maxRenderbufferSize);

    // EM_ASM macro inserts JavaScript code as-is
    // https://github.com/kripken/emscripten/wiki/Interacting-with-code
#ifdef EMSCRIPTEN
    EM_ASM(
        Module.ctx.pixelStorei(0x9243, 0); // Set UNPACK_COLORSPACE_CONVERSION_WEBGL to GL_NONE
        Module.ctx.pixelStorei(0x9240, 0); // Set UNPACK_FLIP_Y_WEBGL to GL_FALSE
    );
#endif

    return true;
}

bool App::setup()
{
    const bool platformOk = checkPlatform();
    if (!platformOk)
        return false;

    glViewport(0, 0, canvasWidth, canvasHeight);
    renderer = new Renderer;

    displayShader = renderer->addShader("assets/fulltri.vs", "assets/display.fs");
    computeShader = renderer->addShader("assets/fulltri.vs", "assets/compute.fs");
    CGLE;

    const float fullTriVertices[] = {
        -3.f,-1.f,0.5f,  -1.f,0.f,
         1.f,-1.f,0.5f,   1.f,0.f,
         1.f, 3.f,0.5f,   1.f,2.f
    };
    static_assert(sizeof(fullTriVertices) == 3*5*sizeof(float), "fullTri");
    glGenBuffers(1, &fullTriVB);
    glBindBuffer(GL_ARRAY_BUFFER, fullTriVB);
    glBufferData(GL_ARRAY_BUFFER, sizeof(fullTriVertices), fullTriVertices, GL_STATIC_DRAW);
    glBindBuffer(GL_ARRAY_BUFFER, 0);

#ifndef EMSCRIPTEN
    const vec2 invCanvasSize(1.f / canvasWidth,
                             1.f / canvasHeight);

    u8* buffer = new u8[512*512*3];
    u8* dst = buffer;
    for (int i = 0; i < 512; i++) {
        for (int j = 0; j < 512; j++) {
            const float fragX = j+0.5f;
            const float fragY = i+0.5f;

            float x = 1.f - fragX*invCanvasSize.x;
            const float y = fragY*invCanvasSize.y * 32.f;
            const float fade = fract(pow(2.f, floor(y)) + x);

            const int minexp = 120;
            const int row = static_cast<int>(floor(y));
            for (int k = 0; k < minexp+row; k++) x /= 2.f;
            for (int k = 0; k < minexp+row; k++) x *= 2.f;
            //x /= exp2(minexp);
            //x /= exp2(row);
            //x *= exp2(minexp);
            //x *= exp2(row);

            float fadeR = fade;
            if (x == 0.f)
                fadeR = clamp(fade+0.5f, 0.f, 0.9999f);

            if (fract(y) < 0.9f) {
                const u8 v = static_cast<u8>(fade * 256.f);
                const u8 vR = static_cast<u8>(fadeR * 256.f);
                assert(fade * 256.f < 256.f);
                assert(fadeR * 256.f < 256.f);
                *dst++ = vR;
                *dst++ = v;
                *dst++ = v;
            }
            else {
                *dst++ = 0;
                *dst++ = 0;
                *dst++ = 0;
            }
        }
    }

    glGenTextures(1, &cpuPrecisionTexture);
    glBindTexture(GL_TEXTURE_2D, cpuPrecisionTexture);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, 512, 512, 0, GL_RGB, GL_UNSIGNED_BYTE, buffer);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
    delete [] buffer;
#endif

    glGenFramebuffers(1, &framebuffer);
    glGenTextures(1, &colorbuffer);
    CGLE;

    assert(canvasWidth == 512 && canvasHeight == 512);
    glBindTexture(GL_TEXTURE_2D, colorbuffer);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, 512, 512, 0, GL_RGB, GL_UNSIGNED_BYTE, nullptr);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
    CGLE;

    glBindFramebuffer(GL_FRAMEBUFFER, framebuffer);
    glFramebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, colorbuffer, 0);
    GLenum status = glCheckFramebufferStatus(GL_FRAMEBUFFER);
    if (status != GL_FRAMEBUFFER_COMPLETE) {
        std::cout << "Failed to build a framebuffer: " << status << "!" << std::endl;
    }
    CGLE;
    glBindFramebuffer(GL_FRAMEBUFFER, 0);

    return true;
}

void App::drawFrame()
{
    const vec2 invCanvasSize(1.f / canvasWidth,
                             1.f / canvasHeight);

    glDisable(GL_DEPTH_TEST);
    glDisable(GL_CULL_FACE);

    if (!frameRendered) {
        glBindFramebuffer(GL_FRAMEBUFFER, framebuffer);
        glClearColor(0.f, 0.f, 0.f, 0.f);
        glClear(GL_COLOR_BUFFER_BIT);

        renderer->setShader(computeShader);
        renderer->setUniform2fv("invCanvasSize", 1, &invCanvasSize[0]);

        glBindBuffer(GL_ARRAY_BUFFER, fullTriVB);
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
        glEnableVertexAttribArray(0);
        glEnableVertexAttribArray(1);
        glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 5*sizeof(float), reinterpret_cast<GLvoid*>(0));
        glVertexAttribPointer(1, 2, GL_FLOAT, GL_FALSE, 5*sizeof(float), reinterpret_cast<GLvoid*>(3*sizeof(float)));
        glDrawArrays(GL_TRIANGLES, 0, 3);
        glDisableVertexAttribArray(0);
        glDisableVertexAttribArray(1);

        frameRendered = true;
    }

    glBindFramebuffer(GL_FRAMEBUFFER, 0);
    renderer->setShader(displayShader);
    renderer->setUniform2fv("invCanvasSize", 1, &invCanvasSize[0]);
    renderer->setUniform1i("sam", 0);
    glActiveTexture(GL_TEXTURE0);
#ifndef EMSCRIPTEN
    glBindTexture(GL_TEXTURE_2D, (displayCpu) ? cpuPrecisionTexture : colorbuffer);
#else
    glBindTexture(GL_TEXTURE_2D, colorbuffer);
#endif

    glBindBuffer(GL_ARRAY_BUFFER, fullTriVB);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
    glEnableVertexAttribArray(0);
    glEnableVertexAttribArray(1);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 5*sizeof(float), reinterpret_cast<GLvoid*>(0));
    glVertexAttribPointer(1, 2, GL_FLOAT, GL_FALSE, 5*sizeof(float), reinterpret_cast<GLvoid*>(3*sizeof(float)));
    glDrawArrays(GL_TRIANGLES, 0, 3);
    glDisableVertexAttribArray(0);
    glDisableVertexAttribArray(1);
}

void App::onKey(int key, int action)
{
#ifndef EMSCRIPTEN
    if (action == GLFW_PRESS) {
        if (key == GLFW_KEY_BACKSPACE && cmd.length() > 0) {
            std::cout << '\b' << ' ' << '\b';
            std::cout.flush();
            cmd.pop_back();
        }
        else if (key == GLFW_KEY_UP) {
            const std::string manySpaces(42, ' ');
            std::cout << '\r' << manySpaces << '\r' << previousCmd;
            std::cout.flush();
            cmd = previousCmd;
        }
        else if (key == GLFW_KEY_ENTER) {
            std::cout << std::endl;
            previousCmd = cmd;
            const size_t loc = cmd.find(' ');
            if (loc == std::string::npos) {
                cmd.clear();
                return;
            }
            setAppValue(cmd.substr(0, loc).c_str(), cmd.substr(loc+1).c_str());
            cmd.clear();
        }
        else if (key == GLFW_KEY_F12) {
            std::cout << "Storing current render...";
            assert(canvasWidth == 512 && canvasHeight == 512);
            u8* pixels = new u8[canvasWidth * canvasHeight * 3];
            glReadPixels(0,0, canvasWidth, canvasHeight, GL_RGB, GL_UNSIGNED_BYTE, pixels);
            CGLE;

            // Store in binary PPM (http://en.wikipedia.org/wiki/Netpbm_format)
            std::ofstream of;
            of.open("render.ppm", std::ofstream::out | std::ofstream::binary);
            assert(of.is_open());
            std::string header = "P6\n" +
                                 std::to_string(canvasWidth) + " " +
                                 std::to_string(canvasHeight) +
                                 "\n255\n";
            of.write(&header[0], header.size());
            of.write(reinterpret_cast<char*>(pixels), canvasWidth*canvasHeight*3*sizeof(u8));
            of.close();
            delete [] pixels;
            std::cout << " done!" << std::endl;
        }
    }
#endif
}

void App::onChar(int key, int action)
{
#ifndef EMSCRIPTEN
    if (action == GLFW_PRESS && key < 256) {
        // Key should be Latin-1
        std::cout << static_cast<char>(key);
        std::cout.flush();
        cmd.append(1, key);
    }
#endif
}

void App::onMousePos(int x, int y)
{
}

void App::onMouseButton(int button, int action)
{
}

void App::onMouseWheel(int pos)
{
}

/// GLFW C callbacks chaining. Porting the code to another platform (with OpenGL support)
/// would ideally require modification only to the code below!
void glfwOnMousePos(int x, int y)
{
    gApp->onMousePos(x, y);
}

void glfwOnMouseButton(int button, int action)
{
    gApp->onMouseButton(button, action);
}

void glfwOnMouseWheel(int pos)
{
    gApp->onMouseWheel(pos);
}

void glfwOnKey(int key, int action)
{
    gApp->onKey(key, action);
}

void glfwOnChar(int key, int action)
{
    gApp->onChar(key, action);
}

void glfwDrawFrame()
{
    gApp->drawFrame();
}

int main()
{
    if (glfwInit() != GL_TRUE) {
        std::cout << "Failed to init glfw!" << std::endl;
        return 1;
    }

    glfwOpenWindowHint(GLFW_WINDOW_NO_RESIZE, GL_TRUE);
    if (glfwOpenWindow(512,512, 8,8,8,0, 0,0,GLFW_WINDOW) != GL_TRUE) {
        std::cout << "Failed to open a window!" << std::endl;
        glfwTerminate();
        return 2;
    }

    int width, height;
    glfwGetWindowSize(&width, &height);
    gApp = new App(width, height);

    glewInit();
    glfwSetWindowTitle("WebGL output tests");
    glfwSetKeyCallback(glfwOnKey);
    glfwSetCharCallback(glfwOnChar);
    glfwSetMousePosCallback(glfwOnMousePos);
    glfwSetMouseButtonCallback(glfwOnMouseButton);
    glfwSetMouseWheelCallback(glfwOnMouseWheel);

    if (!gApp->setup()) {
        delete gApp;
        glfwTerminate();
        return 3;
    }

#ifdef EMSCRIPTEN
    emscripten_set_main_loop(glfwDrawFrame, 0, 1);
#else
    while (true) {
        gApp->drawFrame();
        glfwSwapBuffers();

        if (glfwGetKey(GLFW_KEY_ESC) || !glfwGetWindowParam(GLFW_OPENED))
            break;
    }
#endif

    std::cout << "Terminating..." << std::endl;
    delete gApp;
    glfwTerminate();
    return 0;
}
