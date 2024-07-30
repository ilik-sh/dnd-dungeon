import { ThreeEvent, Vector3 } from '@react-three/fiber';
import React from 'react';

import { Tools } from 'pages/map-editor/model/constants/tools';
import { layoutSelector } from 'pages/map-editor/model/store/map/map.selector';
import { extendMap } from 'pages/map-editor/model/store/map/map.slice';
import { getSelectedTool } from 'pages/map-editor/model/store/tools/tools.selector';

import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';

type Props = {};

const calculateTilePosition: (arg1: number, arg2: number, arg3: number) => Vector3 | undefined = (
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

// const hex = new CylinderGeometry(1, 1, 1, 6, 1, false, Math.PI / 2, 2 * Math.PI);
// const blankSpace = new CylinderGeometry(1, 1, 0.0, 6, 1, false, Math.PI / 2, 2 * Math.PI);

export default function BorderHex({}: Props) {
  const map = useAppSelector(layoutSelector);
  const tool = useAppSelector(getSelectedTool());
  const dispatch = useAppDispatch();

  if (tool !== Tools.AddRow) {
    return null;
  }

  const handleTopClicked = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    dispatch(extendMap({ direction: 'top' }));
  };

  const handleBottomClicked = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    dispatch(extendMap({ direction: 'bottom' }));
  };

  const handleRightClicked = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    dispatch(extendMap({ direction: 'right' }));
  };

  const handleLeftClicked = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    dispatch(extendMap({ direction: 'left' }));
  };

  return (
    <>
      <mesh onClick={handleLeftClicked}>
        {map[0].map((_, index) => {
          return (
            <mesh position={calculateTilePosition(-1, index + 1, 1)}>
              <cylinderGeometry args={[1, 1, 0.0, 6, 1, false, Math.PI / 2, 2 * Math.PI]} />
              <meshStandardMaterial color={'forestGreen'} transparent={true} opacity={0.3}></meshStandardMaterial>
            </mesh>
          );
        })}
      </mesh>
      <mesh onClick={handleTopClicked}>
        {map.map((_, index) => {
          return (
            <mesh position={calculateTilePosition(index, -1, 1)}>
              <cylinderGeometry args={[1, 1, 0.0, 6, 1, false, Math.PI / 2, 2 * Math.PI]} />
              <meshStandardMaterial color={'forestGreen'} transparent={true} opacity={0.3}></meshStandardMaterial>
            </mesh>
          );
        })}
      </mesh>
      <mesh onClick={handleRightClicked}>
        {map[0].map((_, index) => {
          return (
            <mesh position={calculateTilePosition(map.length, index, 1)}>
              <cylinderGeometry args={[1, 1, 0.0, 6, 1, false, Math.PI / 2, 2 * Math.PI]} />
              <meshStandardMaterial color={'forestGreen'} transparent={true} opacity={0.3}></meshStandardMaterial>
            </mesh>
          );
        })}
      </mesh>
      <mesh onClick={handleBottomClicked}>
        {map.map((_, index) => {
          return (
            <mesh position={calculateTilePosition(index, map[0].length, 1)}>
              <cylinderGeometry args={[1, 1, 0.0, 6, 1, false, Math.PI / 2, 2 * Math.PI]} />
              <meshStandardMaterial color={'forestGreen'} transparent={true} opacity={0.3}></meshStandardMaterial>
            </mesh>
          );
        })}
      </mesh>
    </>
  );
}
