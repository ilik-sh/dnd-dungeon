import { Box, Typography, styled } from '@mui/material';
import React from 'react';
import main from 'assets/images/not-found/main.png';

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
            // width: '40%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '100px 0',
          }}
        >
          <Typography
            variant="h1"
            color="white"
            sx={{ textShadow: '1px 2px 10px black', fontWeight: '600', fontSize: '120px' }}
          >
            Dopple Dungeon
          </Typography>
          <Typography variant="h2" color="darkGrey" sx={{ textShadow: '1px 2px 10px black' }}>
            Your way to perfect adventure
          </Typography>
        </div>
      </StyledWrapper>
    </section>
  );
}
