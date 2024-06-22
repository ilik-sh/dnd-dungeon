import { Typography, Avatar, styled, Container, Box } from '@mui/material';
import React, { FC } from 'react';

type IconTitleProps = {
  title: string;
  Icon: React.ElementType;
};

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  background: theme.palette.primary.main,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const IconTitle: FC<IconTitleProps> = ({ title, Icon }) => {
  return (
    <StyledBox>
      <StyledAvatar>
        <Icon sx={{ width: '100%', height: '100%' }} />
      </StyledAvatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
    </StyledBox>
  );
};

export default IconTitle;
