import React from 'react';

import { Box, styled, Typography } from '@mui/material';

import { MapProfile } from '../model/types/map-profile.type';
import MapCardSkeleton from './map-card-skeleton.comp';
import MapCard from './map-card.comp';

type Props = {
  maps: MapProfile[] | undefined;
};

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  padding: '1rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gridAutoRows: 'minmax(100px, auto)',
  gap: '1rem',
}));

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '300px',
}));

export default function MapGrid({ maps }: Props) {
  if (!maps) {
    return (
      <GridContainer>
        {Array.from(Array(4)).map((_) => (
          <MapCardSkeleton />
        ))}
      </GridContainer>
    );
  }

  if (maps.length === 0) {
    return (
      <CenteredBox>
        <Typography variant="body1">No maps found for you</Typography>
      </CenteredBox>
    );
  }

  return (
    <>
      <GridContainer>
        {maps.map((map) => (
          <MapCard map={map} key={map.id} />
        ))}
      </GridContainer>
    </>
  );
}
