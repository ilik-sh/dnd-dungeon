import { Environment } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';

import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';
import { Vector2, Vector3 } from 'three';

import { selectMap, selectMapId } from '../../model/store/map/map.selector';
import { setSelectedCell } from '../../model/store/map/map.slice';
import BlankCellObject from './blank-cell.comp';
import CustomControls from './custom-controls.comp';
import ScreenshotRecorder from './screenshot-recorder.comp';
import { ThreeHexItem } from './three-hex-item.comp';

const calculateTilePosition = (tileX: number, tileY: number, size: number) => {
  let x = new Vector2();
  return new Vector3(
    (tileX * size * 1.01 * 3) / 2,

    0,
    tileY * Math.sqrt(3) * size * 1.01 + (((tileX % 2) * Math.sqrt(3)) / 2) * size,
  );
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
      style={{ background: '#21212190' }}
      camera={{ position: [4, 15, 14] }}
      onClickCapture={handleCanvasClick}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Environment preset="forest" />

      <mesh>
        {map.map((item, column) =>
          item.map((cell, row) =>
            cell ? (
              <ThreeHexItem cell={cell} position={calculateTilePosition(column, row, 1)} key={cell.id} />
            ) : (
              <BlankCellObject position={calculateTilePosition(column, row, 1)} coordinates={{ x: column, y: row }} />
            ),
          ),
        )}
      </mesh>
      <ScreenshotRecorder mapId={id} />
      <CustomControls />
    </Canvas>
  );
}
