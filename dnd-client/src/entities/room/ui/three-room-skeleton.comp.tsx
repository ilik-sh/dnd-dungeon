import { MeshWobbleMaterial } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';

import { hex } from 'shared/ui/geometries';

type ThreeRoomSkeletonProps = {} & MeshProps;

export default function ThreeRoomSkeleton({ ...props }: ThreeRoomSkeletonProps) {
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
