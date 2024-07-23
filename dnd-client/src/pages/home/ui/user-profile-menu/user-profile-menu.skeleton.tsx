import React from 'react';

import { Button, Skeleton, styled } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  gap: '5px',
  color: 'white',
  justifyContent: 'flex-end',
}));

export default function UserProfileMenuSkeleton() {
  return (
    <StyledButton disabled>
      <Skeleton variant="circular" width="32px" height="32px"></Skeleton>
      <Skeleton width="64px" height="32px"></Skeleton>
    </StyledButton>
  );
}
