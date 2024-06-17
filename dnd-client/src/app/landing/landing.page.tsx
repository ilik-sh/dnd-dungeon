import React, { useEffect } from 'react';

import { alpha } from '@mui/material';
import { Box, styled } from '@mui/system';
import main from 'assets/images/main/main.png';

import Footer from './components/footer.comp';
import MainSection from './components/main.section';
import MapShowcaseSection from './components/map-showcase.section';
import Header from 'app/configuration/components/header/header.comp';

const HeroBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${main})`,
  backgroundRepeat: 'no-repeat',
  backgroundColor: alpha(theme.palette.landing.main, 0.5),
  backgroundBlendMode: 'multiply',
  backgroundSize: 'cover',
  backgroundPosition: 'bottom',
  height: '100dvh',
  paddingBottom: '40px',
}));

export default function LandingPage() {
  useEffect(() => {
    document.title = 'Dungeon';
  });

  return (
    <>
      <HeroBox>
        <Header />
        <MainSection />
      </HeroBox>
      <MapShowcaseSection />
      <Footer />
    </>
  );
}
