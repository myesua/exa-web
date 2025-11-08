'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

const noise = `
    // Standard Perlin Noise 3D function
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
      vec3 x0 =   v - i + dot(i, C.xxx) ;

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
      vec3 x3 = x0 - D.yyy;      // 1.0 * 1 = D.y

    // Permutations
      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size is 17*17 = 289.
      float n_ = 0.142857142857; // 1.0/7.0
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,7)

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.y + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      //vec4 s0 = vec4(lessThan(b0, 0.0))*2.0 - 1.0;
      //vec4 s1 = vec4(lessThan(b1, 0.0))*2.0 - 1.0;
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xzyw;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.xzyw;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

    //Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
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

const WavyPlane = ({
  color,
  speed = 0.5,
  amplitude = 0.5,
}: {
  color: string;
  speed?: number;
  amplitude?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime() * speed;

    if (meshRef.current) {
      meshRef.current.rotation.z = time * 0.05;

      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material && material.uniforms && material.uniforms.time) {
        material.uniforms.time.value = time;
      }
    }

    // Subtle camera movement to give parallax effect
    camera.position.x = Math.sin(time * 0.1) * 0.2;
    camera.position.y = Math.cos(time * 0.1) * 0.2;
    camera.lookAt(0, 0, 0);
  });

  const onBeforeCompile = (shader: THREE.ShaderMaterial) => {
    shader.vertexShader = noise + shader.vertexShader;
    shader.uniforms.time = { value: 0 };
    shader.uniforms.amplitude = { value: amplitude };
    shader.uniforms.frequency = { value: 0.1 };

    shader.vertexShader = shader.vertexShader.replace(
      'void main() {',
      `
      uniform float time;
      uniform float amplitude;
      uniform float frequency;
      
      void main() {
      `
    );

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      float t = time * 0.5;
      vec3 finalPos = transformed;
      
      // Sample noise at a slower, offset frequency
      float distortion = snoise(vec3(
          finalPos.x * frequency + t, 
          finalPos.y * frequency, 
          finalPos.z * frequency // <<< CORRECTED TYPO HERE
      ));

      // Apply displacement along the normal (or just Z-axis for a flat plane effect)
      finalPos.z += distortion * amplitude;

      transformed = finalPos;
      `
    );
  };

  return (
    <mesh ref={meshRef} position={[0, 0, -2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[12, 12, 256, 256]} />
      <meshStandardMaterial
        color={color}
        wireframe={true}
        onBeforeCompile={onBeforeCompile}
      />
    </mesh>
  );
};

export const GlobalSearchNetwork = () => {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3], fov: 75 }}>
      <Suspense fallback={null}>
        <color attach="background" args={['#101010']} />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.5}
          penumbra={1}
          intensity={5}
          color="#0070F3"
        />
        <WavyPlane color="#0070F3" speed={0.4} amplitude={1.5} />
      </Suspense>
    </Canvas>
  );
};
