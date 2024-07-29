import { Link } from 'react-router-dom';

import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { router } from 'App';
import Logo from 'shared/assets/icons/logo.icon';

const StyledLink = styled(Link)({
  lineHeight: '1',
});

export default function LinkHeader() {
  const handleLinkClicked = () => {
    router.navigate('/');
  };
  return (
    <Box sx={{ width: '100%' }}>
      <AppBar component="nav" sx={{ display: 'block', position: 'static', width: '100%' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'space-between',
          }}
        >
          <Box display={'flex'} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <StyledLink
              onClick={handleLinkClicked}
              sx={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}
            >
              <Logo sx={{ width: '36px', height: '36px', color: 'transparent' }} />
              <Typography variant="body2" sx={{ fontWeight: '800', fontSize: '36px' }}>
                DnDHub
              </Typography>
            </StyledLink>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
