import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface Ceramic {
  id: number;
  name: string;
  color: string;
  texture: string;
}

interface ApartmentProps {
  ceramic: Ceramic;
}

const Apartment: React.FC<ApartmentProps> = ({ ceramic }) => {
  const floorRef = useRef<THREE.Mesh>(null);
  const floorTexture = useTexture(ceramic.texture);
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(20, 20);

  const wallTexture = useTexture(
    'https://images.unsplash.com/photo-1604147495798-57beb5d6af73?auto=format&fit=crop&q=80&w=2000&h=2000'
  );
  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(5, 3);

  const woodTexture = useTexture(
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=2000&h=2000'
  );
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(2, 2);

  const fabricTexture = useTexture(
    'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&q=80&w=2000&h=2000'
  );
  fabricTexture.wrapS = fabricTexture.wrapT = THREE.RepeatWrapping;
  fabricTexture.repeat.set(2, 2);

  useFrame(() => {
    if (floorRef.current) {
      floorRef.current.material.map = floorTexture;
      floorRef.current.material.needsUpdate = true;
    }
  });

  const roomLights = useMemo(
    () => [
      { position: [0, 5, 0], intensity: 0.7 },
      { position: [-5, 5, -5], intensity: 0.5 },
      { position: [5, 5, 5], intensity: 0.5 },
    ],
    []
  );

  const wallColor = '#fff700'; // Warm off-white for walls
  const woodColor = '#8B4513'; // Saddle Brown for wooden furniture
  const fabricColor = '#D2B48C'; // Tan for fabric furniture
  const metalColor = '#B8B8B8'; // Light gray for metal surfaces
  const glassColor = '#E6F3FF'; // Light blue tint for glass

  return (
    <group>
      {/* Floor */}
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
      >
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial map={floorTexture} color={ceramic.color} />
      </mesh>

      {/* Walls */}
      <Wall
        position={[-10, 3, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[15, 6]}
        texture={wallTexture}
        color={wallColor}
      />
      <Wall
        position={[10, 3, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        size={[15, 6]}
        texture={wallTexture}
        color={wallColor}
      />
      <Wall
        position={[0, 3, -7.5]}
        rotation={[0, 0, 0]}
        size={[20, 6]}
        texture={wallTexture}
        color={wallColor}
      />
      <Wall
        position={[0, 3, 7.5]}
        rotation={[0, Math.PI, 0]}
        size={[20, 6]}
        texture={wallTexture}
        color={wallColor}
      />

      {/* Interior Walls */}
      <Wall
        position={[-3, 3, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[15, 6]}
        texture={wallTexture}
        color={wallColor}
      />
      <Wall
        position={[3, 3, -3]}
        rotation={[0, 0, 0]}
        size={[6, 6]}
        texture={wallTexture}
        color={wallColor}
      />
      <Wall
        position={[6, 3, 1.5]}
        rotation={[0, Math.PI / 2, 0]}
        size={[6, 6]}
        texture={wallTexture}
        color={wallColor}
      />

      {/* Living Room */}
      <Sofa
        position={[-6, 0.5, -4]}
        rotation={[0, Math.PI / 2, 0]}
        texture={fabricTexture}
        color={fabricColor}
      />
      <TVStand
        position={[-8, 0.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        texture={woodTexture}
        color={woodColor}
      />
      <CoffeeTable
        position={[-6, 0.3, -1]}
        texture={woodTexture}
        color={woodColor}
      />

      {/* Kitchen */}
      <KitchenCounter
        position={[7, 0.5, -5]}
        rotation={[0, Math.PI, 0]}
        texture={woodTexture}
        color={woodColor}
      />
      <Refrigerator position={[8.5, 1, -6]} color={metalColor} />
      <DiningTable
        position={[5, 0.5, -2]}
        texture={woodTexture}
        color={woodColor}
      />

      {/* Bedroom */}
      <Bed
        position={[-6, 0.5, 5]}
        rotation={[0, Math.PI / 2, 0]}
        texture={woodTexture}
        color={woodColor}
      />
      <Wardrobe
        position={[-8.5, 1, 6]}
        texture={woodTexture}
        color={woodColor}
      />
      <Nightstand
        position={[-4.5, 0.3, 6]}
        texture={woodTexture}
        color={woodColor}
      />

      {/* Bathroom */}
      <Toilet position={[8, 0.3, 5]} rotation={[0, -Math.PI / 2, 0]} />
      <Sink position={[8, 0.7, 3]} rotation={[0, -Math.PI / 2, 0]} />
      <Bathtub position={[5, 0.3, 6]} rotation={[0, Math.PI, 0]} />

      {/* Lights */}
      <ambientLight intensity={0.3} />
      {roomLights.map((light, index) => (
        <pointLight
          key={index}
          position={light.position}
          intensity={light.intensity}
        />
      ))}

      {/* Windows */}
      <Window
        position={[-9.9, 3, -3]}
        rotation={[0, Math.PI / 2, 0]}
        glassColor={glassColor}
        frameColor={woodColor}
      />
      <Window
        position={[-9.9, 3, 3]}
        rotation={[0, Math.PI / 2, 0]}
        glassColor={glassColor}
        frameColor={woodColor}
      />
      <Window
        position={[9.9, 3, -3]}
        rotation={[0, -Math.PI / 2, 0]}
        glassColor={glassColor}
        frameColor={woodColor}
      />
    </group>
  );
};

const Wall: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
  texture: THREE.Texture;
  color: string;
}> = ({ position, rotation, size, texture, color }) => (
  <mesh position={position} rotation={rotation}>
    <planeGeometry args={size} />
    <meshStandardMaterial map={texture} color={color} />
  </mesh>
);

const Sofa: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  texture: THREE.Texture;
  color: string;
}> = ({ position, rotation, texture, color }) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <boxGeometry args={[3, 1, 1.5]} />
      <meshStandardMaterial map={texture} color={color} />
    </mesh>
    <mesh position={[0, 0.6, -0.6]}>
      <boxGeometry args={[3, 0.8, 0.3]} />
      <meshStandardMaterial map={texture} color={color} />
    </mesh>
  </group>
);

const TVStand: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  texture: THREE.Texture;
  color: string;
}> = ({ position, rotation, texture, color }) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <boxGeometry args={[2, 0.5, 1]} />
      <meshStandardMaterial map={texture} color={color} />
    </mesh>
    <mesh position={[0, 1, 0]}>
      <boxGeometry args={[1.5, 1, 0.1]} />
      <meshStandardMaterial color="#000000" />
    </mesh>
  </group>
);

const CoffeeTable: React.FC<{
  position: [number, number, number];
  texture: THREE.Texture;
  color: string;
}> = ({ position, texture, color }) => (
  <mesh position={position}>
    <boxGeometry args={[1.5, 0.5, 1]} />
    <meshStandardMaterial map={texture} color={color} />
  </mesh>
);

const KitchenCounter: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  texture: THREE.Texture;
  color: string;
}> = ({ position, rotation, texture, color }) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <boxGeometry args={[4, 1, 1]} />
      <meshStandardMaterial map={texture} color={color} />
    </mesh>
    <mesh position={[0, 0.55, 0]}>
      <boxGeometry args={[4, 0.1, 1]} />
      <meshStandardMaterial color="#C0C0C0" />{' '}
      {/* Silver color for countertop */}
    </mesh>
  </group>
);

const Refrigerator: React.FC<{
  position: [number, number, number];
  color: string;
}> = ({ position, color }) => (
  <mesh position={position}>
    <boxGeometry args={[1, 2, 1]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

const DiningTable: React.FC<{
  position: [number, number, number];
  texture: THREE.Texture;
  color: string;
}> = ({ position, texture, color }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[2, 0.8, 1.5]} />
      <meshStandardMaterial map={texture} color={color} />
    </mesh>
    {[-0.7, 0.7].map((x) =>
      [-0.5, 0.5].map((z) => (
        <mesh key={`chair-${x}-${z}`} position={[x, -0.2, z]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial map={texture} color={color} />
        </mesh>
      ))
    )}
  </group>
);

const Bed: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  texture: THREE.Texture;
  color: string;
}> = ({ position, rotation, texture, color }) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <boxGeometry args={[2, 0.5, 3]} />
      <meshStandardMaterial map={texture} color={color} />
    </mesh>
    <mesh position={[0, 0.3, 0]}>
      <boxGeometry args={[1.9, 0.2, 2.9]} />
      <meshStandardMaterial color="#F5F5DC" /> {/* Beige color for bedding */}
    </mesh>
  </group>
);

const Wardrobe: React.FC<{
  position: [number, number, number];
  texture: THREE.Texture;
  color: string;
}> = ({ position, texture, color }) => (
  <mesh position={position}>
    <boxGeometry args={[1, 2, 2]} />
    <meshStandardMaterial map={texture} color={color} />
  </mesh>
);

const Nightstand: React.FC<{
  position: [number, number, number];
  texture: THREE.Texture;
  color: string;
}> = ({ position, texture, color }) => (
  <mesh position={position}>
    <boxGeometry args={[0.6, 0.5, 0.6]} />
    <meshStandardMaterial map={texture} color={color} />
  </mesh>
);

const Toilet: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
}> = ({ position, rotation }) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <boxGeometry args={[0.6, 0.8, 0.4]} />
      <meshStandardMaterial color="#FFFFFF" />
    </mesh>
    <mesh position={[0, 0.5, -0.2]}>
      <boxGeometry args={[0.6, 0.1, 0.4]} />
      <meshStandardMaterial color="#FFFFFF" />
    </mesh>
  </group>
);

const Sink: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
}> = ({ position, rotation }) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <boxGeometry args={[0.8, 0.1, 0.5]} />
      <meshStandardMaterial color="#FFFFFF" />
    </mesh>
    <mesh position={[0, -0.2, 0]}>
      <boxGeometry args={[0.4, 0.3, 0.3]} />
      <meshStandardMaterial color="#C0C0C0" />{' '}
      {/* Silver color for sink basin */}
    </mesh>
  </group>
);

const Bathtub: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
}> = ({ position, rotation }) => (
  <mesh position={position} rotation={rotation}>
    <boxGeometry args={[2, 0.6, 1]} />
    <meshStandardMaterial color="#FFFFFF" />
  </mesh>
);

const Window: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  glassColor: string;
  frameColor: string;
}> = ({ position, rotation, glassColor, frameColor }) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial color={glassColor} transparent opacity={0.3} />
    </mesh>
    <mesh position={[0, 0, 0.01]}>
      <boxGeometry args={[2, 2, 0.1]} />
      <meshStandardMaterial color={frameColor} />
    </mesh>
  </group>
);

export default Apartment;
