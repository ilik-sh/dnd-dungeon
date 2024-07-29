import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import Header from 'pages/landing/ui/header.comp';
import LinkHeader from 'shared/ui/link-header.comp';

import notFoundBig from './assets/not-found.webp';
import notFoundSmall from './assets/not-found.webp';

type Props = {};

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const ContentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '1',
});

const NotFoundBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  gap: '100px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    gap: '0px',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  background: `url(${notFoundBig})`,
  width: '360px',
  height: '360px',
  backgroundSize: 'cover',
  backgroundClip: 'content-box',
  boxShadow: `inset 10px 10px 40px 35px ${theme.palette.landing.main}, inset -10px -10px 40px 35px ${theme.palette.landing.main}`,
  [theme.breakpoints.down('sm')]: {
    background: `url(${notFoundSmall})`,
    width: '192px',
    height: '192px',
  },
}));

const TextBox = styled(Box)(({ theme }) => ({
  textWrap: 'wrap',
  width: '50%',

  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: '6rem',
  fontWeight: '700',
  lineHeight: '8rem',
  color: theme.palette.text.primary,
}));

const TextTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: '400',
  color: theme.palette.text.primary,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export default function NotFoundPage({}: Props) {
  useEffect(() => {
    document.title = 'Not Found';
  });

  return (
    <StyledBox>
      <LinkHeader />
      <ContentBox>
        <NotFoundBox>
          <TextBox>
            <TitleTypography>404</TitleTypography>
            <TextTypography>
              We have no such page, but <StyledLink to="/">there</StyledLink> are plenty of other adventures
            </TextTypography>
          </TextBox>
          <ImageContainer />
        </NotFoundBox>
      </ContentBox>
    </StyledBox>
  );
}
