import { Vector3 } from '@react-three/fiber';

export const calculateTilePosition: (arg0: number, arg1: number, arg2: number) => Vector3 | undefined = (
  tileX: number,
  tileY: number,
  size: number,
) => {
  return [
    (tileX * size * 1.01 * 3) / 2,
    0,
    tileY * Math.sqrt(3) * size * 1.01 + (((tileX % 2) * Math.sqrt(3)) / 2) * size,
  ];
};
