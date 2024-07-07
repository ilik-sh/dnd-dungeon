import React from 'react';

import { styled } from '@mui/material';
import { MapView } from 'types/map-view.dto';

import MapCard from 'components/map-card/map-card.comp';

const GridContainer = styled('div')({
  display: 'grid',
});

type Props = {
  maps: MapView[];
};

export default function MapList({ maps }: Props) {
  return (
    <GridContainer>
      {maps.map((map) => (
        <MapCard map={map} key={map.id} />
      ))}
    </GridContainer>
  );
}
