import React from 'react';

import { Box, Link, styled } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

import mapImage from './image.png';

const MapCover = styled('img')({
  objectFit: 'cover',
  width: '320px',
  height: '180px',
});

const StyledLink = styled('a')({});

const StyledBox = styled(Box)({
  minWidth: '300px',
});

const ImageWrapper = styled(Box)({
  borderRadius: '12px',
  border: '1px solid grey',
  display: 'flex',
  cursor: 'pointer',
  '&:hover': {
    background: '#00000040',
  },
});

const InfoBox = styled(Box)({
  marginTop: '5px',
});

const DescriptionBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const AuthorLink = styled(Link)({
  color: blueGrey[200],
  '$:hover': {
    cursor: 'pointer',
  },
  '&>span': {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const MapNameLink = styled(Link)({
  color: blueGrey[100],
  fontWeight: '600',
});

export default function Map() {
  return (
    <StyledBox>
      <StyledLink>
        <ImageWrapper>
          <MapCover sizes="(min-width: 736px) 50vw, (min-width: 1440px) 25vw, 100vw" src={mapImage} />
        </ImageWrapper>
      </StyledLink>
      <InfoBox>
        <DescriptionBox>
          <MapNameLink variant="body2">Very cool dungeon map</MapNameLink>
          <AuthorLink variant="caption">
            by <span>Alex</span>
          </AuthorLink>
        </DescriptionBox>
      </InfoBox>
    </StyledBox>
  );
}
