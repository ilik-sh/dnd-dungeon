import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import CreateProjectMenu from '../../components/create-project-menu';

import Sidebar from '../sidebar/sidebar.comp';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 220;

const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: '0px',
  zIndex: '1',
}));

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <StyledBox>
      <AppBar component="nav" sx={{ display: 'block', position: 'static', width: '100%' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon style={{ color: 'white' }} />
            </IconButton>
            <Typography variant="body1">Home</Typography>
          </div>
          <CreateProjectMenu />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Sidebar />
        </Drawer>
      </nav>
    </StyledBox>
  );
}
