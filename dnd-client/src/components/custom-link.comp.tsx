import React, { FC } from 'react';
import { Box, Link, Typography, styled } from '@mui/material';

interface CustomLinkProps {
  text?: string;
  clickableText?: string;
  onClick: React.MouseEventHandler;
}

const StyledLink = styled(Link)({
  cursor: 'pointer',
});

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '5px',
  width: '100%',
});

const CustomLink: FC<CustomLinkProps> = ({ text, clickableText, onClick }) => {
  return (
    <StyledBox>
      <Typography>{text}</Typography>
      <StyledLink onClick={onClick}>{clickableText}</StyledLink>
    </StyledBox>
  );
};

export default CustomLink;
