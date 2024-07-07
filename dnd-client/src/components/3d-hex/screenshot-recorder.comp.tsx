import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';

import { getStorage, ref, uploadString } from 'firebase/storage';

type Props = {
  mapId: string;
};

export default function ScreenshotRecorder({ mapId }: Props) {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    const storage = getStorage();
    const mapImageRef = ref(storage, 'mapThumbnails/' + mapId);
    gl.render(scene, camera);
    const mapImage = gl.domElement.toDataURL();
    uploadString(mapImageRef, mapImage, 'data_url');
  });

  return <mesh></mesh>;
}
