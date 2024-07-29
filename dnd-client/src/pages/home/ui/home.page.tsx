import React, { useState } from 'react';

import { TabContext, TabPanel } from '@mui/lab';
import { Box, styled } from '@mui/material';
import { MapGrid, useGetUserMapsQuery } from 'entities/map';
import { ModalsManager, ModalsProvider } from 'widgets/modals-provider';

import { Tabs } from '../model/constants/tabs';
import Header from './header';
import HomeTabProvider from './home-tab.provider';
import Sidebar from './sidebar.comp';
import AssetsTab from './tabs/assets.tab';
import MapsTab from './tabs/maps.tab';

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
  const [value, setValue] = useState('maps');
  const { data } = useGetUserMapsQuery(null);
  return (
    <HomeBox>
      <ModalsProvider>
        <HomeTabProvider>
          <ModalsManager />
          <StyledSidebar />
          <ContentBox>
            <Header></Header>
            <TabPanel value={Tabs.Maps}>
              <MapsTab />
            </TabPanel>
            <TabPanel value={Tabs.Assets}>
              <AssetsTab />
            </TabPanel>
          </ContentBox>
        </HomeTabProvider>
      </ModalsProvider>
    </HomeBox>
  );
}
