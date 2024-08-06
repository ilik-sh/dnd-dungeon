import React, { useState } from 'react';

import { Contrast, KeyboardArrowDown, Logout, Settings } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, Menu, MenuItem, styled, Typography } from '@mui/material';
import { router } from 'App';

import { useGetUserQuery } from 'entities/user';

import { LocalStorageKeys } from 'shared/libs/enums/local-storage-keys.enum';

import UserProfileMenuSkeleton from './user-profile-menu.skeleton';

type Props = {};

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '32px',
  height: '32px',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  gap: '5px',
  color: 'white',
  justifyContent: 'flex-end',
}));

const MenuAvatar = styled(Avatar)(({ theme }) => ({
  width: '64px',
  height: '64px',
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  alignItems: 'center',
  gap: '10px',
  minWidth: '200px',
}));

const UserCredentialsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function UserProfileMenu({}: Props) {
  const [menuAnchorElement, setMenuAnchorElement] = useState<null | HTMLElement>(null);
  const { data, isLoading } = useGetUserQuery();
  const open = Boolean(menuAnchorElement);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorElement(null);
  };

  const handleSignOutClicked = () => {
    localStorage.removeItem(LocalStorageKeys.AccessToken);
    localStorage.removeItem(LocalStorageKeys.RefreshToken);
    router.navigate('/');
  };

  if (isLoading) {
    return <UserProfileMenuSkeleton />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <StyledButton
        onClick={handleMenuOpen}
        endIcon={
          <KeyboardArrowDown
            sx={{
              rotate: open ? '180deg' : '',
            }}
          />
        }
      >
        <StyledAvatar />
        <StyledTypography variant="body1">{data.username}</StyledTypography>
      </StyledButton>
      <Menu anchorEl={menuAnchorElement} open={open} onClose={handleMenuClose} disableScrollLock>
        <UserBox>
          <MenuAvatar />
          <UserCredentialsBox>
            <Typography variant="body1">{data.username}</Typography>
          </UserCredentialsBox>
        </UserBox>
        <MenuItem>
          <Settings />
          Settings
        </MenuItem>
        <MenuItem>
          <Contrast />
          Theme
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOutClicked}>
          <Logout />
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
}
