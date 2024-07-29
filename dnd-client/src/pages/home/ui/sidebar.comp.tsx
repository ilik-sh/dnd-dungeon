import React from 'react';

import { KeyboardArrowDown } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import { Avatar, Button, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

import HomeTabs from './home-tabs-list.comp';
import UserProfileMenu from './user-profile-menu/user-profile-menu.comp';

const SidebarBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  width: 'var(--sidebar-width)',
  height: '100dvh',
  background: theme.palette.background.paper,
}));

const ContentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const ProfileBox = styled(Box)(({ theme }) => ({
  padding: '0 12px',
  height: 'var(--header-height)',
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  return (
    <SidebarBox className={className}>
      <ContentBox>
        <ProfileBox>
          <UserProfileMenu />
        </ProfileBox>
        <HomeTabs />
      </ContentBox>
    </SidebarBox>
  );
}
