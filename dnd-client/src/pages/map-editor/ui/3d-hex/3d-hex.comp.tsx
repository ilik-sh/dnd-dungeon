import { Environment, Preload, View } from '@react-three/drei';
import { Canvas, Vector3 } from '@react-three/fiber';
import { Suspense } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';

import { selectMap, selectMapId } from '../../model/store/map/map.selector';
import { setSelectedCell } from '../../model/store/map/map.slice';
import BlankCellObject from './blank-cell.comp';
import BorderHex from './border-hex.comp';
import CustomControls from './custom-controls.comp';
import HexItemSkeleton from './hex-item-skeleton.comp';
import ScreenshotRecorder from './screenshot-recorder.comp';
import { ThreeHexItem } from './three-hex-item.comp';

const calculateTilePosition: (arg0: number, arg1: number, arg2: number) => Vector3 | undefined = (
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

export default function ThreeHex() {
  const map = useAppSelector(selectMap());
  const id = useAppSelector(selectMapId());
  const dispatch = useAppDispatch();

  const handleCanvasClick = () => {
    dispatch(setSelectedCell(null));
  };

  return (
    <Canvas
      camera={{ position: [4, 15, 14] }}
      onClickCapture={handleCanvasClick}
      gl={{ preserveDrawingBuffer: true }}
      style={{ background: '#21212190' }}
    >
      <Environment preset="forest" />
      <mesh>
        {map.map((item, column) =>
          item.map((cell, row) =>
            cell ? (
              <Suspense key={cell.id} fallback={<HexItemSkeleton position={calculateTilePosition(column, row, 1)} />}>
                <ThreeHexItem cell={cell} position={calculateTilePosition(column, row, 1)} />
              </Suspense>
            ) : (
              <BlankCellObject
                position={calculateTilePosition(column, row, 1)}
                coordinates={{ x: column, y: row }}
                key={column + row}
              />
            ),
          ),
        )}
        {/* <Model /> */}
        <BorderHex />
      </mesh>
      <ScreenshotRecorder mapId={id} />
      <CustomControls />
    </Canvas>
  );
}
