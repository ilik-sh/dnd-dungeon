import React from 'react';

import { Box, Skeleton, styled } from '@mui/material';

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

const ImageSkeleton = styled(Skeleton)({
  color: 'transparent',
  zIndex: '0',
});

const NameSkeleton = styled(Skeleton)({});

const AuthorSkeleton = styled(Skeleton)({});

export default function MapCardSkeleton() {
  return (
    <StyledBox>
      <ImageSkeleton variant="rounded" height={180} />
      <NameSkeleton variant="rounded" width={150} />
      <AuthorSkeleton variant="rounded" width={75} />
    </StyledBox>
  );
}
