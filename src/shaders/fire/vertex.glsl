uniform sampler2D uPerlinTexture;
uniform float uTime;

varying vec2 vUv;

#include ../includes/rotate2D.glsl

void main()
{
  vec3 newPosition = position;

  // Twist
  float twistPerlin = texture(uPerlinTexture, vec2(0.5, uv.y * 0.1 - uTime * 0.05)).r;
  float angle = twistPerlin * 1.0;
  newPosition.xz = rotate2D(newPosition.xz, angle);

  // Final Position
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

  // varyings
  vUv = uv;
}