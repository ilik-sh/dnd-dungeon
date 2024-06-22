import React from 'react';

import { Hexagon } from '@mui/icons-material';
import { Box, Link, styled, Typography } from '@mui/material';

const StyledWrapper = styled(Box)(({ theme }) => ({
  padding: '20px',
  height: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  borderTop: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  },
}));

const LogoBox = styled(Box)({
  display: 'flex',
  gap: '20px',
});

const LinkBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2vw',
});

const LogoTypography = styled(Typography)({
  textTransform: 'uppercase',
  fontWeight: '800',
  fontSize: '24px',
  verticalAlign: 'middle',
  lineHeight: '2',
  textWrap: 'nowrap',
});

const LogoHexagon = styled(Hexagon)(({ theme }) => ({
  width: '48px',
  height: '48px',
  color: theme.palette.primary.main,
}));

export default function Footer() {
  return (
    <footer>
      <StyledWrapper>
        <LogoBox>
          <LogoHexagon />
          <LogoTypography variant="body1">Dopple dungeon</LogoTypography>
        </LogoBox>
        <LinkBox>
          <Link>Home</Link>
          <Link>Docs</Link>
          <Link>License</Link>
          <Link>Cookies</Link>
        </LinkBox>
      </StyledWrapper>
    </footer>
  );
}
