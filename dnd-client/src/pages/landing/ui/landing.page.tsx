import React, { useEffect } from 'react';

import { alpha } from '@mui/material';
import { Box, styled } from '@mui/system';
import main from 'shared/assets/images/main/main.png';
import { ModalsManager, ModalsProvider } from 'widgets/modals-provider';
import { SignInModal } from 'widgets/sign-in-modal';

import Footer from './footer.comp';
import Header from './header.comp';
import MainSection from './main.section';
import MapShowcaseSection from './map-showcase.section';

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
    <ModalsProvider>
      <ModalsManager />
      <HeroBox>
        <Header />
        <MainSection />
      </HeroBox>
      <MapShowcaseSection />
      <Footer />
    </ModalsProvider>
  );
}
