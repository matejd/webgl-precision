#if GL_ES
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
#endif

uniform vec2 invCanvasSize;
uniform sampler2D sam;
varying vec2 vuv;

void main()
{
    gl_FragColor = texture2D(sam, gl_FragCoord.xy * invCanvasSize);
}
