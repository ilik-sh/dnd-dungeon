import { Box, Typography, styled } from '@mui/material';
import React from 'react';

const StyledWrapper = styled(Box)({
  height: 'auto',
  width: '100%',
});

export default function MainSection() {
  return (
    <section>
      <StyledWrapper>
        <div
          style={{
            width: '40%',
            background: '#212121',
            padding: '20px',
          }}
        >
          <Typography variant="h2" color="white">
            Your way to perfect adventure
          </Typography>
          <p>GHello</p>
        </div>
      </StyledWrapper>
    </section>
  );
}
