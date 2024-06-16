import { Box, Typography, keyframes, styled } from '@mui/material';
import Scrollable from 'components/hoc/scrollable.comp';
import Map from 'components/map/map.comp';
import React from 'react';

type Props = {};

const StyledWrapper = styled(Box)({
  paddingTop: '20px',
  height: 'auto',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#101113',
  boxShadow: '0px -10px 40px 30px #101113',
});

const StyledScroll = styled(Scrollable)({
  gap: '10px',
});

export default function MapShowcaseSection({}: Props) {
  return (
    <section>
      <StyledWrapper>
        <Typography variant="h2" sx={{ padding: '10px', color: 'white', fontWeight: '600' }}>
          Community created maps
        </Typography>
        <StyledScroll>
          <Map></Map>
          <Map></Map>
          <Map></Map>
          <Map></Map>
        </StyledScroll>
      </StyledWrapper>
    </section>
  );
}
