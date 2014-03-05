all:
	emcc main.cpp common.cpp renderer.cpp stb_image.cpp -s TOTAL_MEMORY=134217728 -o build/index.html -std=c++11 -I. --preload-file assets

native:
	clang -g3 -Wall -o build/precision.exe main.cpp common.cpp renderer.cpp stb_image.cpp -std=c++11 -lm -lGLEW -lpthread `pkg-config --cflags libglfw` `pkg-config --libs libglfw` -lGL -lstdc++
