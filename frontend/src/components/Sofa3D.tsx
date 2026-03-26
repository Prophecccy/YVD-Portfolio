import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, useGLTF, Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { useInView } from 'framer-motion';

// Using a highly realistic 3D model instead of primitives
const RealSofa = () => {
  const { scene } = useGLTF('/models/sofa.glb');

  const rotRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (rotRef.current) {
      rotRef.current.rotation.y += 0.003; // Ultra smooth luxury rotation
    }
  });

  return (
    <group ref={rotRef} position={[0, -0.6, 0]}>
      <primitive object={scene} scale={3} />
    </group>
  );
};

const Sofa3D = () => {
  const webglRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(webglRef, { margin: "800px" });

  return (
    <div ref={webglRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas 
        dpr={[1, 1.5]} /* Cap rendering load on 4k retina displays to ensure 60FPS */
        frameloop={isInView ? "always" : "demand"}
        gl={{ powerPreference: "high-performance", alpha: true, antialias: false }} 
        camera={{ position: [0, 2, 5], fov: 45 }}
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        
        {/* Photorealistic PBR lighting environment */}
        <Environment preset="city" />

        <Suspense fallback={null}>
          <RealSofa />
        </Suspense>

        <ContactShadows position={[0, -0.6, 0]} opacity={0.4} scale={10} blur={2.5} far={4} resolution={256} frames={1} />
      </Canvas>
    </div>
  );
};

export default Sofa3D;

// Preload the model so it doesn't cause pop-in
useGLTF.preload('/models/sofa.glb');
