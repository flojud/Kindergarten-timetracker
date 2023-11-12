import {
  AccessTime,
  Add,
  BeachAccess,
  ChevronLeft,
  ChevronRight,
  Home,
  Login,
  Logout,
  Menu,
  Person,
  Subscriptions,
} from '@mui/icons-material';
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Link as Link2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { Props } from '../../interfaces/Types';
import ToggleColorMode from '../common/ToggleColorMode';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const NavigationDrawer: FC<Props> = ({ children }) => {
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', p: 2 }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}>
              <Menu />
            </IconButton>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex' },
                flexGrow: 1,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
              Kindergarten Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}</IconButton>
          </DrawerHeader>
          <Divider />

          {authContext?.loggedIn && (
            <>
              <List>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/" onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/profile" onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/time/view" onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <AccessTime />
                    </ListItemIcon>
                    <ListItemText primary="Zeiten" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/time/add" onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <ListItemText primary="Eintragen" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/absences/view" onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <BeachAccess />
                    </ListItemIcon>
                    <ListItemText primary="Abwesenheit" />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider />
            </>
          )}
          <List>
            {authContext?.loggedIn ? (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    authContext?.authMethods.logout();
                    handleDrawerClose();
                  }}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/signin" onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <Login />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/signup" onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <Subscriptions />
                    </ListItemIcon>
                    <ListItemText primary="Registrieren" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ToggleColorMode
                light={themeContext.light}
                toggle={() => {
                  themeContext.toggleTheme();
                  handleDrawerClose();
                }}
              />
            </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {children}
        </Main>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'primary.dark',
          p: 2,
          mt: 2,
          width: '100%',
        }}>
        <Stack spacing={2} direction="row" alignItems="flex-start">
          <Typography variant="caption" color="primary">
            <Link2 href="/legal/policy" color="inherit">
              Datenschutz&shy;erkl&auml;rung
            </Link2>
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="caption" color="primary">
            <Link2 href="/legal/terms " color="inherit">
              Impressum
            </Link2>
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default NavigationDrawer;
