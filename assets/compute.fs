#if GL_ES
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
#endif

uniform vec2 invCanvasSize;
varying vec2 vuv;

const int minexp = 120;
const int MAX_LOOPS = 152;

void main()
{
    // Relevant blog posts:
    // http://youilabs.com/blog/mobile-gpu-floating-point-accuracy-variances/
    // http://community.arm.com/groups/arm-mali-graphics/blog/2013/05/29/benchmarking-floating-point-precision-in-mobile-gpus
    // http://community.arm.com/groups/arm-mali-graphics/blog/2013/10/10/benchmarking-floating-point-precision-in-mobile-gpus--part-iii

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
}

