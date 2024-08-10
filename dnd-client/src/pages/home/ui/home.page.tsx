import React from 'react';

import { Box, styled } from '@mui/material';
import { MapGrid, useGetUserMapsQuery } from 'entities/map';
import { ModalsManager, ModalsProvider } from 'widgets/modals-provider';

import Header from './header';
import Sidebar from './sidebar.comp';

const HomeBox = styled(Box)({
  display: 'flex',
});

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 'var(--sidebar-width)',
  width: '100%',
  position: 'relative',
  [theme.breakpoints.down(600)]: {
    marginLeft: '0',
  },
}));

const StyledSidebar = styled(Sidebar)(({ theme }) => ({
  [theme.breakpoints.down(600)]: {
    left: 'calc(-1 * var(--sidebar-width))',
  },
}));

export default function HomePage() {
  const { data } = useGetUserMapsQuery(null);
  return (
    <HomeBox>
      <ModalsProvider>
        <ModalsManager />
        <StyledSidebar />
        <ContentBox>
          <Header></Header>
          <MapGrid maps={data}></MapGrid>
        </ContentBox>
      </ModalsProvider>
    </HomeBox>
  );
}
