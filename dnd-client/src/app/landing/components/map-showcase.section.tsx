import React from 'react';

import { Box, styled, Typography } from '@mui/material';

import Scrollable from 'components/hoc/scrollable.comp';
import Map from 'components/map/map.comp';

const StyledSection = styled('section')(({ theme }) => ({
  paddingBottom: '40px',
  background: theme.palette.landing.main,
}));

const StyledWrapper = styled(Box)({
  padding: '0 20px',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',

  boxShadow: '0px -10px 40px 30px #101113',
});

const StyledScroll = styled(Scrollable)({
  minWidth: '90%',
  gap: '10px',
});

export default function MapShowcaseSection() {
  return (
    <StyledSection>
      <StyledWrapper>
        <Typography variant="h2" sx={{ color: 'white', fontWeight: '600' }}>
          Community created maps
        </Typography>
        <StyledScroll>
          <Map></Map>
          <Map></Map>
          <Map></Map>
          <Map></Map>
          <Map></Map>
          <Map></Map>
        </StyledScroll>
      </StyledWrapper>
    </StyledSection>
  );
}
