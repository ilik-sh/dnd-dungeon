import React, { SyntheticEvent, useContext } from 'react';

import { TabList } from '@mui/lab';
import { styled, Tab } from '@mui/material';

import { Tabs } from '../model/constants/tabs';
import { HomeTabContext } from '../model/home-tab.context';

type Props = {};

const StyledTabList = styled(TabList)(({ theme }) => ({
  '.MuiTabs-flexContainer': {
    flexDirection: 'column',
  },
  '.MuiTabs-indicator': {
    display: 'none',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.landing.main,
  },
  padding: '24px',
  fontFamily: theme.typography.fontSecondaryFamily,
  fontSize: '24px',
}));

export default function HomeTabs({}: Props) {
  const { setTab } = useContext(HomeTabContext);

  const handleClick = (e: SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <StyledTabList onChange={handleClick}>
      <StyledTab label="Maps" value={Tabs.Maps} disableRipple />
      <StyledTab label="Assets" value={Tabs.Assets} disableRipple />
    </StyledTabList>
  );
}
