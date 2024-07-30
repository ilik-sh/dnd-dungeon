import { useEffect } from 'react';

import { Button, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { router } from 'App';

import serverSmall from './assets/images/server-error-small.webp';
import server from './assets/images/server-error.webp';

type ServerErrorPageProps = {
  resetErrorBoundary: () => void;
  error: Error;
};

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '2rem',
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
  background: `url(${server})`,
  width: '360px',
  objectFit: 'cover',
  backgroundClip: 'content-box',
  boxShadow: `inset 10px 0px 50px 35px ${theme.palette.landing.main}, inset -10px 0px 50px 35px ${theme.palette.landing.main}`,
  height: '360px',

  [theme.breakpoints.down('sm')]: {
    background: `url(${serverSmall})`,
    width: '192px',
    height: '192px',
  },
}));

const TextBox = styled(Box)(({ theme }) => ({
  textWrap: 'wrap',
  flex: '2',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: '700',
  color: theme.palette.text.primary,
}));

const TextTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: '400',
  maxWidth: '800px',
  color: theme.palette.text.primary,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '1rem',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  gap: '1rem',
}));

export default function ServerErrorPage({ error, resetErrorBoundary }: ServerErrorPageProps) {
  useEffect(() => {
    document.title = 'Error';
  });

  const handleGoBackClicked = () => {
    resetErrorBoundary();
    router.navigate('/');
  };

  return (
    <StyledBox>
      <ContentBox>
        <NotFoundBox>
          <TextBox>
            <TitleTypography variant="h1">Oops</TitleTypography>
            <TextTypography>
              Someone casted a random teleportation spell on our server. We are trying our best to find it. Try
              refreshing in a few minutes {error.message} {error.message} {error.stack}
            </TextTypography>
            <ButtonContainer>
              <StyledButton variant="contained" fullWidth onClick={resetErrorBoundary}>
                Refresh
              </StyledButton>
              <StyledButton fullWidth onClick={handleGoBackClicked}>
                Return to main page
              </StyledButton>
            </ButtonContainer>
          </TextBox>
          <ImageContainer />
        </NotFoundBox>
      </ContentBox>
    </StyledBox>
  );
}
