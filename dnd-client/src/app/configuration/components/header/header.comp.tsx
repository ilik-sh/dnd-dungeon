import * as React from 'react';
import { Link } from 'react-router-dom';

import { Hexagon } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { router } from 'App';
import { openModal } from 'store/modals.slice';

import { useAppDispatch } from 'hooks/redux.hooks';
import { useAuth } from 'hooks/use-auth.hook';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

const StyledLink = styled(Link)({
  lineHeight: '1',
});

export default function Header(props: Props) {
  const { window } = props;
  const dispatch = useAppDispatch();
  const isAuth = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleHomeClicked = () => {
    if (!isAuth) {
      dispatch(openModal('signIn'));
    }
    if (isAuth) {
      router.navigate('home');
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary={'Docs'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon color={'error'} />
            </IconButton>

            <StyledLink to="/">
              <Hexagon sx={{ width: '32px', height: '32px' }} color={'primary'} />
            </StyledLink>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#fff' }}>Docs</Button>
            </Box>
          </Box>

          <Button variant="contained" onClick={handleHomeClicked}>
            Home
          </Button>
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
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
