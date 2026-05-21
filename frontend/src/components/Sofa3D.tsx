import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useInView } from 'framer-motion';

interface RealSofaModelProps {
  opacity: React.MutableRefObject<number>;
  onLoad?: () => void;
}

// 1. High-fidelity Real Sofa Model with Dynamic Opacity Control
const RealSofaModel: React.FC<RealSofaModelProps> = ({ opacity, onLoad }) => {
  const { scene } = useGLTF('/models/sofa.glb');

  useEffect(() => {
    // Enable transparency and set initial opacity to 0 on all meshes
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            mat.transparent = true;
            mat.opacity = 0;
          });
        } else if (mesh.material) {
          mesh.material.transparent = true;
          mesh.material.opacity = 0;
        }
      }
    });

    onLoad?.();
  }, [scene, onLoad]);

  // Continuously apply the smooth lerped opacity value from the parent
  useFrame(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            mat.opacity = opacity.current;
          });
        } else if (mesh.material) {
          mesh.material.opacity = opacity.current;
        }
      }
    });
  });

  return <primitive object={scene} />;
};

interface ProceduralSofaProps {
  isMobile: boolean;
  opacity: number;
}

// 2. High-fidelity Procedural Fallback Sofa (Velvet cushions + Gold legs)
const ProceduralSofa: React.FC<ProceduralSofaProps> = ({ opacity }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat) {
            mat.transparent = true;
            mat.opacity = opacity;
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Seat Upholstery */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.9, 0.15, 0.45]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.75} metalness={0.1} />
      </mesh>

      {/* Backrest Cushion */}
      <mesh position={[0, 0.3, -0.2]}>
        <boxGeometry args={[0.9, 0.3, 0.08]} />
        <meshStandardMaterial color="#1f1f1f" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Left Armrest */}
      <mesh position={[-0.47, 0.22, 0]}>
        <boxGeometry args={[0.08, 0.32, 0.46]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.75} metalness={0.1} />
      </mesh>

      {/* Right Armrest */}
      <mesh position={[0.47, 0.22, 0]}>
        <boxGeometry args={[0.08, 0.32, 0.46]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.75} metalness={0.1} />
      </mesh>

      {/* Modern Cylinder Gold Trim Legs */}
      {/* Front Left */}
      <mesh position={[-0.43, -0.08, 0.18]} rotation={[0.1, 0, -0.05]}>
        <cylinderGeometry args={[0.015, 0.008, 0.22]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.15} metalness={0.95} />
      </mesh>
      {/* Front Right */}
      <mesh position={[0.43, -0.08, 0.18]} rotation={[0.1, 0, 0.05]}>
        <cylinderGeometry args={[0.015, 0.008, 0.22]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.15} metalness={0.95} />
      </mesh>
      {/* Back Left */}
      <mesh position={[-0.43, -0.08, -0.18]} rotation={[-0.1, 0, -0.05]}>
        <cylinderGeometry args={[0.015, 0.008, 0.22]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.15} metalness={0.95} />
      </mesh>
      {/* Back Right */}
      <mesh position={[0.43, -0.08, -0.18]} rotation={[-0.1, 0, 0.05]}>
        <cylinderGeometry args={[0.015, 0.008, 0.22]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.15} metalness={0.95} />
      </mesh>
    </group>
  );
};

interface SceneContentProps {
  isMobile: boolean;
  isModelLoaded: boolean;
  setIsModelLoaded: (loaded: boolean) => void;
}

// 3. Shared Scene Content for Uniform Synchronization
const SceneContent: React.FC<SceneContentProps> = ({ isMobile, isModelLoaded, setIsModelLoaded }) => {
  const rotRef = useRef<THREE.Group>(null);
  const initialized = useRef(false);

  const glbOpacityRef = useRef(0);
  const proceduralOpacityRef = useRef(1);
  const [proceduralOpacity, setProceduralOpacity] = useState(1);

  useFrame(() => {
    if (rotRef.current) {
      // Rotate the shared parent so fallback & heavy assets rotate in sync
      rotRef.current.rotation.y += 0.003;

      const targetScale = isMobile ? 1.7 : 3.0;
      const targetY = isMobile ? -0.4 : -0.6;

      if (!initialized.current) {
        rotRef.current.scale.setScalar(targetScale * 0.7);
        rotRef.current.position.y = targetY + 0.6;
        initialized.current = true;
      }

      const currentScale = rotRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.05);
      rotRef.current.scale.setScalar(nextScale);

      const currentY = rotRef.current.position.y;
      const nextY = THREE.MathUtils.lerp(currentY, targetY, 0.05);
      rotRef.current.position.y = nextY;
    }

    // Smoothly animate the cross-fade opacity values
    if (isModelLoaded) {
      if (glbOpacityRef.current < 1) {
        glbOpacityRef.current = THREE.MathUtils.lerp(glbOpacityRef.current, 1, 0.04);
        if (glbOpacityRef.current > 0.99) glbOpacityRef.current = 1;
      }
      if (proceduralOpacityRef.current > 0) {
        proceduralOpacityRef.current = THREE.MathUtils.lerp(proceduralOpacityRef.current, 0, 0.04);
        if (proceduralOpacityRef.current < 0.01) proceduralOpacityRef.current = 0;
        setProceduralOpacity(proceduralOpacityRef.current);
      }
    }
  });

  return (
    <group ref={rotRef}>
      {/* Instant Fallback Sofa */}
      {proceduralOpacity > 0 && (
        <ProceduralSofa isMobile={isMobile} opacity={proceduralOpacity} />
      )}

      {/* Real High-Detail Model */}
      <Suspense fallback={null}>
        <RealSofaModel opacity={glbOpacityRef} onLoad={() => setIsModelLoaded(true)} />
      </Suspense>
    </group>
  );
};

const Sofa3D = () => {
  const webglRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(webglRef, { margin: "800px" });
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shadowY = isMobile ? -0.4 : -0.6;

  return (
    <div ref={webglRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      {/* 1. Visually Stunning Brutalist Loader Overlay - Minimal Bottom Indicator */}
      {!isModelLoaded && (
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '70px' : '24px',
          left: isMobile ? '24px' : '5vw',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 20,
          pointerEvents: 'none',
          fontFamily: "'Inter', sans-serif"
        }}>
          {/* Elegant Circular Spinner with Pulsing Glow Ring */}
          <div className="sofa-loader-spinner" style={{
            width: '14px',
            height: '14px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderTop: '2px solid #D4AF37', // Luxury Mustard Gold
            borderRadius: '50%',
            animation: 'sofa-spin 1s linear infinite'
          }} />
          {/* Subtle gold pulsing typography */}
          <span style={{
            fontSize: '9px',
            letterSpacing: '2px',
            color: '#ffffff',
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
            textTransform: 'uppercase',
            fontWeight: 500,
            opacity: 0.8,
            animation: 'sofa-fade 1.5s ease-in-out infinite alternate'
          }}>
            Streaming High-Detail Asset
          </span>
        </div>
      )}

      {/* Styled animation keyframes scoping */}
      <style>{`
        @keyframes sofa-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes sofa-fade {
          0% { opacity: 0.45; }
          100% { opacity: 0.95; }
        }
      `}</style>

      {/* 2. Premium 3D Canvas */}
      <div style={{
        width: '100%',
        height: '100%'
      }}>
        <Canvas 
          dpr={[1, 1.5]} /* Cap rendering load on 4k retina displays to ensure 60FPS */
          /* CRITICAL BUG FIX: Force always rendering loops until the model is loaded. 
             If frameloop starts as "demand" when the showcase section is out of the viewport, 
             the loaders suspend rendering forever and the asset never compiles. */
          frameloop={isModelLoaded ? (isInView ? "always" : "demand") : "always"}
          gl={{ powerPreference: "high-performance", alpha: true, antialias: false }} 
          camera={{ position: [0, 2, 5], fov: 45 }}
        >
          {/* Soft ambient light */}
          <ambientLight intensity={0.7} />
          
          {/* Warm main spot light */}
          <directionalLight 
            position={[8, 8, 8]} 
            intensity={1.8} 
            castShadow 
            shadow-mapSize={[512, 512]}
          />
          
          {/* Soft fill light */}
          <directionalLight 
            position={[-8, 4, 8]} 
            intensity={1.0} 
          />
          
          {/* Rim light to define outline contour silhouettes */}
          <directionalLight 
            position={[0, 6, -10]} 
            intensity={2.5} 
          />
          
          {/* Top highlight light */}
          <directionalLight 
            position={[0, 10, 0]} 
            intensity={1.4} 
          />

          <SceneContent 
            isMobile={isMobile} 
            isModelLoaded={isModelLoaded} 
            setIsModelLoaded={setIsModelLoaded} 
          />

          <ContactShadows position={[0, shadowY, 0]} opacity={0.4} scale={10} blur={2.5} far={4} resolution={256} frames={1} />
        </Canvas>
      </div>
    </div>
  );
};

export default Sofa3D;

// Preload the model so it doesn't cause pop-in
useGLTF.preload('/models/sofa.glb');
