import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';

import { getStorage, ref, uploadString } from 'firebase/storage';
import { layoutSelector } from 'pages/map-editor/model/store/map/map.selector';
import { useAppSelector } from 'shared/libs/hooks/redux.hooks';
import { PerspectiveCamera, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

type Props = {
  mapId: string;
};

const calculateTilePosition = (tileX: number, tileY: number, size: number) => {
  return new Vector3(
    (tileX * size * 1.01 * 3) / 2,

    0,
    tileY * Math.sqrt(3) * size * 1.01 + (((tileX % 2) * Math.sqrt(3)) / 2) * size,
  );
};

export default function ScreenshotRecorder({ mapId }: Props) {
  const { gl, scene } = useThree();
  const map = useAppSelector(layoutSelector);

  const position = calculateTilePosition((map.length - 1) / 2, (map[0].length - 1) / 2, 1);
  const cornerPosition = calculateTilePosition(map.length * 1.1, map[0].length * 1.1, 1);
  const mapSize = Math.sqrt(Math.pow(cornerPosition.x, 2) + Math.pow(cornerPosition.z, 2));

  const x = position.x;
  const z = position.z;

  useEffect(() => {
    const camera = new PerspectiveCamera();
    const distanceToTheMap = mapSize / (2 * Math.tan(degToRad(camera.fov / 2)));
    camera.position.set(x, distanceToTheMap, z);
    camera.lookAt(x, 0, z);
    const storage = getStorage();
    const mapImageRef = ref(storage, 'mapThumbnails/' + mapId);
    gl.render(scene, camera);
    const mapImage = gl.domElement.toDataURL();
    uploadString(mapImageRef, mapImage, 'data_url');
  }, []);

  return <></>;
}
