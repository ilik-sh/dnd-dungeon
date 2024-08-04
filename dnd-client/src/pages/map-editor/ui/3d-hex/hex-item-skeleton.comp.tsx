import { animated, useSpring } from '@react-spring/three';
import { MeshDistortMaterial, MeshRefractionMaterial, MeshWobbleMaterial } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';

import { duration } from '@mui/material';
import { MeshBasicMaterial } from 'three';

import { hex } from './geometries';

type HexItemSkeletonProps = {} & MeshProps;

export default function HexItemSkeleton({ ...props }: HexItemSkeletonProps) {
  return (
    <mesh {...props} geometry={hex}>
      <MeshWobbleMaterial
        color={'#212121'}
        transparent={true}
        opacity={0.6}
        factor={0.1}
        speed={10}
      ></MeshWobbleMaterial>
    </mesh>
  );
}
