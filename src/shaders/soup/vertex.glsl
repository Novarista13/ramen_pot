uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallWavesIterations;

#include ../includes/perlinNoise.glsl

void main()
{
  // Elevation
  float elevation = sin(csm_Position.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
    sin(csm_Position.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
    uBigWavesElevation;

  for (float i = 1.0; i <= uSmallWavesIterations; i++)
  {
    elevation -= abs(cnoise(vec3(csm_Position.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) *
      uSmallWavesElevation / i);
  }

  csm_Position.y += elevation;
}