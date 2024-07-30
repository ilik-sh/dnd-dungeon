import { DragControls, PivotControls, useFBX, useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React, { useEffect, useMemo } from 'react';

import { Mesh, TextureLoader } from 'three';

type ModelProps = {
  id: string;
  name: string;
  modelUrl: string;
  metalnessTextureUrl: string;
  roughnessTextureUrl: string;
  normalTextureUrl: string;
  colorTextureUrl: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
};

export default function Model({}: ModelProps) {
  const chest = useFBX('/BatChest.fbx');
  const [normalMap, metallicMap, roughnessMap, colorMap] = useLoader(TextureLoader, [
    '/BatChest_Normal.png',
    '/BatChest_Metallic.png',
    '/BatChest_Roughness.png',
    '/BatChest_Color.png',
  ]);

  const geometry = useMemo(() => {
    let g;
    chest.traverse((c) => {
      if (c.type === 'Mesh') {
        const _c = c as Mesh;
        g = _c.geometry;
      }
    });
    return g;
  }, [chest]);
  return (
    <PivotControls>
      <mesh geometry={geometry} scale={0.1} position={[-1, 0.5, -1]}>
        <meshPhysicalMaterial
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          metalnessMap={metallicMap}
          map={colorMap}
        />
      </mesh>
    </PivotControls>
  );
}
