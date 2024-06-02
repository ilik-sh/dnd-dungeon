import { MapControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Event } from 'three';

type CustomControlProps = {
  limits: {
    x: { max: number; min: number };
    z: { max: number; min: number };
  };
};
export default function CustomControls({ limits }: CustomControlProps) {
  const { camera } = useThree();
  const cameraLastPosition = useRef({
    x: camera.position.x,
    z: camera.position.z,
  });

  return <MapControls mouseButtons={{ MIDDLE: 2 }} enableRotate={false} target={[4, 0, 5.2]} />;
}
