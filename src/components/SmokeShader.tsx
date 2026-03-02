import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useControls } from 'leva';

// Simplex 3D Noise function
const noise3D = `
//
// Description : Array and textureless GLSL 2D/3D/4D simplex 
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
// 

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }
`;

const vertexShader = `
${noise3D}

uniform float uTime;
uniform float uSpeed;
uniform float uWavePattern;
uniform float uDisplacement;

varying vec2 vUv;
varying float vNoise;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  
  // Calculate noise based on position and time
  float time = uTime * uSpeed;
  float noise = snoise(vec3(position.x * uWavePattern, position.y * uWavePattern, position.z * uWavePattern + time));
  
  // Add a second layer of noise for more detail
  float noise2 = snoise(vec3(position.x * (uWavePattern * 2.0), position.y * (uWavePattern * 2.0), position.z * (uWavePattern * 2.0) - time * 1.5));
  
  // Combine noises
  vNoise = noise * 0.7 + noise2 * 0.3;
  
  // Displace vertex along normal
  vec3 newPosition = position + normal * (vNoise * uDisplacement);
  
  // Calculate world position and normal
  vec4 worldPosition = modelMatrix * vec4(newPosition, 1.0);
  vWorldPosition = worldPosition.xyz;
  vNormal = normalize(normalMatrix * normal);
  
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

const fragmentShader = `
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uGlow;

varying vec2 vUv;
varying float vNoise;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  // Normalize noise to 0-1 range
  float normalizedNoise = vNoise * 0.5 + 0.5;
  
  // Mix colors based on noise
  vec3 color = mix(uColor1, uColor2, normalizedNoise);
  
  // Add fresnel glow effect
  vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
  float fresnel = dot(viewDirection, vNormal);
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  fresnel = pow(fresnel, 3.0);
  
  // Combine color, noise glow, and fresnel
  float glowIntensity = pow(normalizedNoise, uGlow) * 2.0;
  vec3 finalColor = color + (color * glowIntensity) + (vec3(1.0) * fresnel * 0.5);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export function SmokeShader() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Leva controls
  const { speed, wavePattern, displacement, glow, color1, color2, wireframe } = useControls('Smoke Animation', {
    speed: { value: 0.4, min: 0.1, max: 2.0, step: 0.1 },
    wavePattern: { value: 1.5, min: 0.5, max: 5.0, step: 0.1 },
    displacement: { value: 0.3, min: 0.0, max: 1.0, step: 0.05 },
    glow: { value: 2.0, min: 0.5, max: 5.0, step: 0.1 },
    color1: '#0ea5e9', // sky-500
    color2: '#8b5cf6', // violet-500
    wireframe: false,
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uWavePattern: { value: wavePattern },
      uDisplacement: { value: displacement },
      uGlow: { value: glow },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uSpeed.value = speed;
      materialRef.current.uniforms.uWavePattern.value = wavePattern;
      materialRef.current.uniforms.uDisplacement.value = displacement;
      materialRef.current.uniforms.uGlow.value = glow;
      materialRef.current.uniforms.uColor1.value.set(color1);
      materialRef.current.uniforms.uColor2.value.set(color2);
      materialRef.current.wireframe = wireframe;
    }
  });

  return (
    <mesh>
      {/* High segment count for smooth displacement */}
      <sphereGeometry args={[1.5, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={wireframe}
      />
    </mesh>
  );
}
