#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#endif

uniform vec2 invCanvasSize;
varying vec2 vuv;

void main()
{
    // Relevant blog posts:
    // http://youilabs.com/blog/mobile-gpu-floating-point-accuracy-variances/
    // http://community.arm.com/groups/arm-mali-graphics/blog/2013/05/29/benchmarking-floating-point-precision-in-mobile-gpus

    // gl_FragCoord.x: from 0.5 to width-0.5
    // Origin bottom left
    float x = 1.0 - gl_FragCoord.x*invCanvasSize.x;
    float y = gl_FragCoord.y*invCanvasSize.y * 26.0;

    // x = 1.0 - 0.5 / width
    // x = 1.0 - (width-0.5) / width = 1.0 - 1.0 + 0.5 / width = 0.5 / width
    // y = 0.5 / height * 26.0
    // y = 511.5 / 512.0 * 26.0

    // 1.0 to 2.0**25.0 = 33554432.0
    float fade = fract(pow(2.0, floor(y)) + x);

    if (fract(y) < 0.9)
        gl_FragColor = vec4(vec3(fade), 0.0);
    else
        gl_FragColor = vec4(1.0, 0.0, 0.0, 0.0);
}
