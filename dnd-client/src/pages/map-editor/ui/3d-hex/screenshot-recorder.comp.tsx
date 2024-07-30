import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';

import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { PerspectiveCamera } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import { layoutSelector, selectMapId } from 'pages/map-editor/model/store/map/map.selector';

import { usePatchMapMutation } from 'entities/map/api/patch-map.mutation';
import { useUpdateMapProfileMutation } from 'entities/map/api/update-map-profile.mutation';

import { useAppSelector } from 'shared/libs/hooks/redux.hooks';

type Props = {
  mapId: string;
};

const calculateTilePosition = (tileX: number, tileY: number, size: number) => {
  return {
    x: (tileX * size * 1.01 * 3) / 2,
    y: 0,
    z: tileY * Math.sqrt(3) * size * 1.01 + (((tileX % 2) * Math.sqrt(3)) / 2) * size,
  };
};

export default function ScreenshotRecorder({ mapId }: Props) {
  const { gl, scene } = useThree();
  const map = useAppSelector(layoutSelector);
  const [patchMap] = usePatchMapMutation();

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
    const mapImage = gl.domElement.toDataURL('image/webp');
    uploadString(mapImageRef, mapImage, 'data_url').then(() => {
      getDownloadURL(mapImageRef).then((url) => {
        patchMap({ name: mapId, thumbnailUrl: url });
      });
    });
  }, []);

  return <></>;
}
