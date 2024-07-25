import React from 'react';

import { Button } from '@mui/material';
import { useAppSelector } from 'shared/libs/hooks/redux.hooks';
import useDownload from 'shared/libs/hooks/use-download.hook';

import { mapSelector } from '../../../model/store/map/map.selector';

export default function Download() {
  const { map, mapName } = useAppSelector(mapSelector);
  const handleDownload = useDownload(map, mapName);

  return (
    <>
      <Button variant="outlined" onClick={handleDownload}>
        Download
      </Button>
    </>
  );
}
