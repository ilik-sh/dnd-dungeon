import React, { useState } from 'react';

import { Contrast, KeyboardArrowDown, Logout, Settings } from '@mui/icons-material';
import { alpha, Avatar, Box, Button, Divider, Menu, MenuItem, Skeleton, styled, Typography } from '@mui/material';
import { useGetUserQuery } from 'api/user/user.api';

import wall from '../../assets/wall.png';

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
}));

const UserCredentialsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const EmailTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {},
}));

const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  marginRight: '0.5rem',
}));

export default function UserProfileMenu({}: Props) {
  const [menuAnchorElement, setMenuAnchorElement] = useState<null | HTMLElement>(null);
  const { data, isLoading, isError, error } = useGetUserQuery();
  const open = Boolean(menuAnchorElement);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorElement(null);
  };

  if (isLoading) {
    return (
      <StyledButton disabled>
        <Skeleton variant="circular" width="32px" height="32px"></Skeleton>
        <Skeleton width="64px" height="32px"></Skeleton>
      </StyledButton>
    );
  }

  return (
    <>
      <StyledButton onClick={handleMenuOpen} endIcon={<KeyboardArrowDown />}>
        <StyledAvatar />
        <StyledTypography variant="body1">iliksh-</StyledTypography>
      </StyledButton>
      <StyledMenu anchorEl={menuAnchorElement} open={open} onClose={handleMenuClose} disableScrollLock>
        <UserBox>
          <MenuAvatar />
          <UserCredentialsBox>
            <Typography variant="caption">iliksh-</Typography>
            <EmailTypography variant="caption">i.shyshparonak@gmail.com</EmailTypography>
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
        <MenuItem>
          <Logout />
          Sign Out
        </MenuItem>
      </StyledMenu>
    </>
  );
}
