import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';

import { selectMapId } from '../../model/store/map/map.selector';
import { setSelectedCell } from '../../model/store/map/map.slice';
import CustomControls from './custom-controls.comp';
import ScreenshotRecorder from './screenshot-recorder.comp';
import ThreeMap from './three-map.comp';

export default function MapCanvas() {
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
      frameloop="demand"
    >
      <Environment preset="forest" />
      <ThreeMap />
      <ScreenshotRecorder mapId={id} />
      <CustomControls />
    </Canvas>
  );
}
