import React from 'react';

import { Box, Button, styled, Typography } from '@mui/material';
import { responsiveFontSizes } from 'theme/typography';

const FullHeightSection = styled('section')({
  display: 'flex',
  justifyContent: 'center',
  height: 'calc(100% - 64px)',
});

const StyledWrapper = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 20px',
});

const MainTextBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
  },
}));

const ButtonBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  margin: '30px 0 80px 0',
  gap: '20px',
  justifyContent: 'space-around',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'flex-start',
  },
}));

const MainHeadingTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Jaini Purva',
  letterSpacing: '1px',
  textShadow: '1px 2px 10px black',
  lineHeight: '2',
  textWrap: 'pretty',
  ...responsiveFontSizes({ sm: 64, md: 84, lg: 104 }),
  [theme.breakpoints.down('sm')]: {
    lineHeight: '1',
  },
}));

const SecondaryHeadinTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Jaini Purva',
  textShadow: '1px 2px 10px black',
  color: theme.palette.grey[500],
}));

const TryButton = styled(Button)({
  padding: '20px 30px',
});

export default function MainSection() {
  return (
    <FullHeightSection>
      <StyledWrapper>
        <MainTextBox>
          <MainHeadingTypography variant="h1">Dopple Dungeon</MainHeadingTypography>
          <SecondaryHeadinTypography variant="h2">Your way to perfect adventure</SecondaryHeadinTypography>
        </MainTextBox>
        <ButtonBox>
          <TryButton variant="contained">Try It Yourself</TryButton>
          <TryButton variant="outlined">Join community</TryButton>
        </ButtonBox>
      </StyledWrapper>
    </FullHeightSection>
  );
}
