import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContextProvider';
import AvatarMenu from './AvatarMenu';
import MainMenu from './MainMenu';

import ChildCareIcon from '@mui/icons-material/ChildCare';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const NavigationBar = () => {
  const authContext = useAuthContext();
  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <MainMenu />
          <ChildCareIcon sx={{ display: { xs: 'flex' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            KITZE
          </Typography>

          {authContext?.user?.uid ? (
            <AvatarMenu />
          ) : (
            <Button variant="contained" component={Link} to="/signin" color="secondary">
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavigationBar;
