import React from 'react';

import { Box, Hidden, Link, styled } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { router } from 'App';
import { MapView } from 'shared/model/types/map-view.dto';

const MapCover = styled('img')({
  objectFit: 'cover',
  minWidth: '320px',
  height: '180px',
});

const StyledLink = styled('a')({});

const StyledBox = styled(Box)({
  minWidth: '300px',
  '&:hover img': {
    filter: 'brightness(85%)',
  },
});

const ImageWrapper = styled(Box)({
  borderRadius: '12px',
  border: '1px solid grey',
  display: 'flex',
  cursor: 'pointer',
  overflow: 'hidden',
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
  display: 'inline',
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
  display: 'flex',
  width: 'auto',
});

type MapCardProps = {
  map: MapView;
};

export default function MapCard({ map }: MapCardProps) {
  const handleCardClicked = () => {
    router.navigate('/map/' + map.id);
  };

  const handleAuthorClicked = () => {
    router.navigate('/author/' + map.creator.id);
  };

  return (
    <StyledBox onClick={handleCardClicked}>
      <StyledLink>
        <ImageWrapper>
          <MapCover
            loading="lazy"
            sizes="(min-width: 736px) 50vw, (min-width: 1440px) 25vw, 100vw"
            alt={map.name}
            src={map.thumbnailUrl}
          />
        </ImageWrapper>
      </StyledLink>
      <InfoBox>
        <DescriptionBox>
          <MapNameLink variant="body2">{map.name}</MapNameLink>
          <AuthorLink variant="caption">
            by <span>{map.createdAt}</span>
          </AuthorLink>
        </DescriptionBox>
      </InfoBox>
    </StyledBox>
  );
}
