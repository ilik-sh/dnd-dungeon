import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';

import { getStorage, ref, uploadString } from 'firebase/storage';
import { layoutSelector } from 'pages/map-editor/model/store/map/map.selector';
import { useAppSelector } from 'shared/libs/hooks/redux.hooks';
import { PerspectiveCamera } from 'three';

type Props = {
  mapId: string;
};

export default function ScreenshotRecorder({ mapId }: Props) {
  const { gl, scene } = useThree();
  const map = useAppSelector(layoutSelector);
  const x = map.length * 0.7;
  const y = map[0].length * 0.7;

  useEffect(() => {
    const camera = new PerspectiveCamera();
    camera.position.set(x, x * x * 0.4, y);
    camera.lookAt(x, 0, y);
    const storage = getStorage();
    const mapImageRef = ref(storage, 'mapThumbnails/' + mapId);
    gl.render(scene, camera);
    const mapImage = gl.domElement.toDataURL();
    uploadString(mapImageRef, mapImage, 'data_url');
  }, []);

  return <></>;
}
