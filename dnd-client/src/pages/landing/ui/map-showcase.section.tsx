import React from 'react';

import { Box, styled, Typography } from '@mui/material';
import Map from 'entities/map/ui/map-card.comp';
import Scrollable from 'shared/ui/scrollable.comp';

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

const map = {
  id: 'dsa',
  name: 'dsaeq',
  thumbnailUrl:
    'https://firebasestorage.googleapis.com/v0/b/dndhub-fb81c.appspot.com/o/defaults%2FmapThumbnail.png?alt=media&token=0ca8fb5d-1468-4e3c-b0fa-dd004a28ef49',
  createdAt: '2024',
  creator: {
    id: 'dsae',
    name: 'Vova',
  },
  tags: [],
};

export default function MapShowcaseSection() {
  return (
    <StyledSection>
      <StyledWrapper>
        <Typography variant="h2" sx={{ color: 'white', fontWeight: '600' }}>
          Community created maps
        </Typography>
        <StyledScroll>
          <Map map={map}></Map>
          <Map map={map}></Map>
          <Map map={map}></Map>
          <Map map={map}></Map>
          <Map map={map}></Map>
          <Map map={map}></Map>
        </StyledScroll>
      </StyledWrapper>
    </StyledSection>
  );
}
