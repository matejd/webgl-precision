WebGL output tests
==================

Floating-point precision, rounding and subnormals. See relevant blog post:
* Benchmarking floating-point precision in mobile GPUs [part 1](http://community.arm.com/groups/arm-mali-graphics/blog/2013/05/29/benchmarking-floating-point-precision-in-mobile-gpus),
[part 2](http://community.arm.com/groups/arm-mali-graphics/blog/2013/06/11/benchmarking-floating-point-precision-in-mobile-gpus--part-ii),
[part 3](http://community.arm.com/groups/arm-mali-graphics/blog/2013/10/10/benchmarking-floating-point-precision-in-mobile-gpus--part-iii)
* Also, the original post at [Youi Labs](http://youilabs.com/blog/mobile-gpu-floating-point-accuracy-variances/)

See the demo [online](http://matejd.github.io/webgl-precision/build/).

A quick summary so you can interpret the results. The fragment
shader that produced the image can be seen below. It's a combination of the
two Tom Olson's shaders. The number of bars (below those completely red ones)
is the number of the bits in the fractional part of the floating point used
by the GPU. The shape ("orca" or "beehive") indicates the rounding used 
("beehive" GPUs use round-to-nearest, "orca" GPUs use less accurate round-to-zero).
Finally, the red region of the image points out whether or not the GPU supports subnormals
(those that do have only a small red region on top right).

Shader code used: 

    uniform vec2 invCanvasSize;
    const int minexp = 120;
    const int MAX_LOOPS = 152;

     // Fractional precision and rounding
    float x = 1.0 - gl_FragCoord.x*invCanvasSize.x;
    float y = gl_FragCoord.y*invCanvasSize.y * 32.0;
    float fade = fract(pow(2.0, floor(y)) + x);

    vec4 color = vec4(fade);

    // Denormals test
    // Loop count must be fixed in WebGL, workaround
    int row = minexp + int(floor(y));
    for (int i = 0; i < MAX_LOOPS; i++) if (i < row) x /= 2.0;
    for (int i = 0; i < MAX_LOOPS; i++) if (i < row) x *= 2.0;

    if (x == 0.0)
      color.x = clamp(color.x+0.5, 0.0, 1.0);

    if (fract(y) < 0.9)
        gl_FragColor = color;
    else
        gl_FragColor = vec4(0.0);       

Example results. CPU reference with complete IEEE-754, RNE and subnormals on the left.
The next one is Radeon HD 3400 (single precision, RNE, but does not have subnormals). 
![CPU reference](http://matejd.github.io/webgl-precision/build/cpu.png) ![HD3400](http://matejd.github.io/webgl-precision/build/gpu-radeon-3400.png)
