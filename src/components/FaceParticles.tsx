import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function FaceModel() {
  // Menggunakan model 3D wajah publik dari repository three.js
  const { nodes } = useGLTF('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb');
  
  const geometry = useMemo(() => {
    let posArray = new Float32Array();
    
    // Ekstrak posisi vertex dari model
    Object.values(nodes).forEach((node: any) => {
      if (node.isMesh && node.geometry.attributes.position) {
        posArray = node.geometry.attributes.position.array;
      }
    });
    
    // Fallback jika gagal ekstrak
    if (posArray.length === 0) {
      const sphere = new THREE.SphereGeometry(1, 32, 32);
      posArray = sphere.attributes.position.array as Float32Array;
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geo.setAttribute('aOriginalPosition', new THREE.BufferAttribute(posArray, 3));
    
    // Tambahkan nilai random untuk animasi tiap partikel
    const randoms = new Float32Array(posArray.length / 3);
    for (let i = 0; i < randoms.length; i++) {
      randoms[i] = Math.random();
    }
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
    
    return geo;
  }, [nodes]);

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uMouse: { value: new THREE.Vector3(0, 0, 0) },
    uTime: { value: 0 },
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Map posisi mouse ke koordinat 3D
      const x = (state.mouse.x * state.viewport.width) / 2;
      const y = (state.mouse.y * state.viewport.height) / 2;
      
      // Efek smooth pergerakan mouse
      materialRef.current.uniforms.uMouse.value.lerp(new THREE.Vector3(x, y, 2), 0.1);
    }
  });

  const vertexShader = `
    uniform vec3 uMouse;
    uniform float uTime;
    attribute vec3 aOriginalPosition;
    attribute float aRandom;
    varying float vDistance;
    
    void main() {
      vec3 pos = aOriginalPosition;
      
      // Efek melayang (floating)
      pos.x += sin(uTime * 2.0 + aRandom * 10.0) * 0.02;
      pos.y += cos(uTime * 2.0 + aRandom * 10.0) * 0.02;
      pos.z += sin(uTime * 1.5 + aRandom * 10.0) * 0.02;
      
      // Interaksi mouse (menjauh dari kursor)
      float dist = distance(pos, uMouse);
      vDistance = dist;
      
      vec3 dir = normalize(pos - uMouse);
      float force = max(0.0, 1.2 - dist);
      pos += dir * force * 0.4;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Ukuran partikel berdasarkan jarak kamera
      gl_PointSize = (8.0 / -mvPosition.z) * (1.0 + aRandom);
    }
  `;

  const fragmentShader = `
    varying float vDistance;
    void main() {
      // Membuat partikel berbentuk lingkaran
      float distToCenter = distance(gl_PointCoord, vec2(0.5));
      if (distToCenter > 0.5) discard;
      
      // Warna partikel
      vec3 color1 = vec3(0.1, 0.4, 1.0); // Biru gelap
      vec3 color2 = vec3(0.0, 0.8, 1.0); // Cyan terang
      vec3 finalColor = mix(color2, color1, vDistance * 0.5);
      
      gl_FragColor = vec4(finalColor, 0.8);
    }
  `;

  return (
    <points geometry={geometry} scale={[1.8, 1.8, 1.8]} position={[0, -0.2, 0]}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function FaceParticles() {
  return (
    <>
      <React.Suspense fallback={null}>
        <FaceModel />
      </React.Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}
