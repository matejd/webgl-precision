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
#include <sstream>
#include <unordered_map>
#include <algorithm>

class App {
public:
    App(int canvasWidth, int canvasHeight): canvasWidth(canvasWidth), canvasHeight(canvasHeight) {}
    virtual ~App();

    bool checkPlatform();
    bool setup();
    void drawFrame();

    void onKey(int key, int action);
    void onMousePos(int x, int y);
    void onMouseButton(int button, int action);
    void onMouseWheel(int pos);

private:
    int canvasWidth, canvasHeight;
    Renderer* renderer = nullptr;

    GLuint fullTriVB;
    ShaderID fragShader;
};

// We can't use C++ methods as GLFW callbacks. Using a global variable and 
// callback chaining as a workaround.
App* gApp = nullptr;

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

    fragShader = renderer->addShader("assets/fulltri.vs", "assets/frag.fs");
    CGLE;

    float fullTriVertices[] = {
        -3.f,-1.f,0.5f,  -1.f,0.f,
         1.f,-1.f,0.5f,   1.f,0.f,
         1.f, 3.f,0.5f,   1.f,2.f
    };
    static_assert(sizeof(fullTriVertices) == 3*5*sizeof(float), "fullTri");
    glGenBuffers(1, &fullTriVB);
    glBindBuffer(GL_ARRAY_BUFFER, fullTriVB);
    glBufferData(GL_ARRAY_BUFFER, sizeof(fullTriVertices), fullTriVertices, GL_STATIC_DRAW);
    glBindBuffer(GL_ARRAY_BUFFER, 0);

    return true;
}

void App::drawFrame()
{
    const vec2 invCanvasSize(1.f / canvasWidth,
                             1.f / canvasHeight);

    glClearColor(0.f, 0.f, 0.f, 0.f);
    glClear(GL_COLOR_BUFFER_BIT);
    glClear(GL_DEPTH_BUFFER_BIT);

    glDisable(GL_DEPTH_TEST);
    glDisable(GL_CULL_FACE);
    renderer->setShader(fragShader);
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
}

void App::onKey(int key, int action)
{
#ifndef EMSCRIPTEN
    if (action == GLFW_PRESS) {
        if (key == GLFW_KEY_SPACE) {
            std::cout << "Storing current render..." << std::endl;
            float* pixels = new float[canvasWidth * canvasHeight * 3];
            glReadPixels(0,0, canvasWidth, canvasHeight, GL_RGB, GL_FLOAT, pixels);
            CGLE;

            // Store in PFM format (http://www.pauldebevec.com/Research/HDR/PFM/)
            std::ofstream of;
            of.open("render.pfm", std::ofstream::out | std::ofstream::binary);
            assert(of.is_open());
            std::string header = "PF\n" +
                                 std::to_string(canvasWidth) + " " +
                                 std::to_string(canvasHeight) +
                                 "\n-1.0\n";
            of.write(&header[0], header.size());
            of.write(reinterpret_cast<char*>(pixels), canvasWidth*canvasHeight*3*sizeof(float));
            of.close();
            delete [] pixels;
        }
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
