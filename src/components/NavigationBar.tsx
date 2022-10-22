import React, { useEffect } from 'react';
import AvatarMenu from './AvatarMenu';
import MainMenu from './MainMenu';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/AuthContextProvider';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { Button } from '@mui/material';
import { useState } from 'react';

const NavigationBar = () => {
  const { user, userAuth } = useContext(UserContext);

  console.log(user);

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

          {user?.uid ? (
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
