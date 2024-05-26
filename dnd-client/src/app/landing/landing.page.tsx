import Header from 'app/configuration/components/header/header.comp';
import React, { useEffect } from 'react';
import MainSection from './components/main.section';

export default function LandingPage() {
  useEffect(() => {
    document.title = 'Dungeon';
  });
  return (
    <>
      <Header />
      <MainSection />
    </>
  );
}
