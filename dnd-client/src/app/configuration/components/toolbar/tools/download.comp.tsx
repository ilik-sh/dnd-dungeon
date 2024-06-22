import { Button } from '@mui/material';
import { mapSelector } from 'app/configuration/store/map.selector';
import { useAppSelector } from 'hooks/redux.hooks';
import useDownload from 'hooks/use-download.hook';
import React from 'react';

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
