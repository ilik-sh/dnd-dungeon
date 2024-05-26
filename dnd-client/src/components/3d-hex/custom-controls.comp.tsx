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

  return (
    <MapControls
      mouseButtons={{ MIDDLE: 2 }}
      enableRotate={false}
      target={[4, 0, 5.2]}
      // onChange={(e?: Event) => {
      //   const maxX = limits.x.max;
      //   const minX = limits.x.min;
      //   const maxZ = limits.z.max;
      //   const minZ = limits.z.min;
      //   const x = e?.target.target.x;
      //   const z = e?.target.target.z;

      //   if (x < minX || x > maxX) {
      //     e?.target.target.setX(x < minX ? minX : maxX);
      //     camera.position.setX(cameraLastPosition.current.x);
      //   }
      //   if (z < minZ || z > maxZ) {
      //     e?.target.target.setZ(z < minZ ? minZ : maxZ);
      //     camera.position.setZ(cameraLastPosition.current.z);
      //   }
      //   cameraLastPosition.current.x = camera.position.x;
      //   cameraLastPosition.current.z = camera.position.z;
      // }}
    />
  );
}
