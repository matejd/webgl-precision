attribute vec3 position;
attribute vec2 uv;
varying vec2 vuv;

void main()
{
    vuv = uv;
    gl_Position = vec4(position, 1.0);
}

