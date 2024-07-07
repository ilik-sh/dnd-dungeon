import React from 'react';

import { Box, styled, Typography } from '@mui/material';
import { MapView } from 'types/map-view.dto';

import MapCardSkeleton from 'components/map-card/map-card-skeleton.comp';
import MapCard from 'components/map-card/map-card.comp';

type Props = {
  maps: MapView[];
};

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  padding: '1rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gridAutoRows: 'minmax(100px, auto)',
  gap: '1rem',
}));

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '300px',
}));

export default function MapList({ maps }: Props) {
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
          <MapCardSkeleton />
        ))}
      </GridContainer>
    </>
  );
}
