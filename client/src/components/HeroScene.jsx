import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial, Icosahedron, Torus } from "@react-three/drei";

function ParticleField() {
  const ref = useRef();
  const count = 900;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#16adba"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

function FloatingGeometry() {
  return (
    <>
      <Float speed={1.4} rotationIntensity={1.1} floatIntensity={1.6}>
        <Icosahedron args={[1.1, 0]} position={[3.4, 1.2, -2]}>
          <meshStandardMaterial
            color="#16adba"
            emissive="#0b8995"
            emissiveIntensity={0.6}
            wireframe
            transparent
            opacity={0.55}
          />
        </Icosahedron>
      </Float>

      <Float speed={1.1} rotationIntensity={0.8} floatIntensity={1.3}>
        <Torus args={[1, 0.32, 16, 48]} position={[-3.6, -0.8, -1.5]} rotation={[0.6, 0.4, 0]}>
          <meshStandardMaterial
            color="#153F6C"
            emissive="#16adba"
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.5}
          />
        </Torus>
      </Float>

      <Float speed={1.8} rotationIntensity={1.4} floatIntensity={2}>
        <mesh position={[1.2, -2, -3]}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#16adba" emissive="#16adba" emissiveIntensity={0.8} transparent opacity={0.35} />
        </mesh>
      </Float>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#16adba" />
        <pointLight position={[-10, -5, -10]} intensity={0.6} color="#153F6C" />
        <Suspense fallback={null}>
          <ParticleField />
          <FloatingGeometry />
        </Suspense>
      </Canvas>
    </div>
  );
}
