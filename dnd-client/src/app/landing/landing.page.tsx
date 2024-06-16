import Header from 'app/configuration/components/header/header.comp';
import React, { useEffect } from 'react';
import MainSection from './components/main.section';
import MapShowcaseSection from './components/map-showcase.section';
import main from 'assets/images/main/main.png';

export default function LandingPage() {
  useEffect(() => {
    document.title = 'Dungeon';
  });
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${main})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#23222790',
          backgroundBlendMode: 'multiply',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      >
        <Header />
        <MainSection />
      </div>

      <MapShowcaseSection />
    </>
  );
}
