import React from 'react';

import { IconButton, IconButtonProps, styled } from '@mui/material';

type RoundButtonProps = {
  children: React.ReactNode;
} & IconButtonProps;

const RoundStyledButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '1px',
  height: '100%',
  aspectRatio: '1/1',
}));

export default function RoundButton({ children, ...rest }: RoundButtonProps) {
  return <RoundStyledButton {...rest}>{children}</RoundStyledButton>;
}
