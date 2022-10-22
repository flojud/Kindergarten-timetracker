import { Box, Button, Grid } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import MainContainer from '../components/MainContainer';
import { UserContext } from '../contexts/AuthContextProvider';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import Item from '../components/Item';

const Home = () => {
  const { user, userAuth } = useContext(UserContext);

  const handleGoogleSignup = async () => {
    userAuth.googleSignIn();
  };

  const checklogin = () => {
    if (user?.uid) {
      console.log(true);
      console.log(user);
    } else {
      console.log(false);
    }
  };

  return (
    <>
      <MainContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            maxWidth: '400px',
          }}>
          <Item>
            <h2>Die beste Zeiterfassung App für Erzieher:innen</h2>
            <h3>name: {user?.displayName}</h3>
            <h4>anonymous: {user?.isAnonymous}</h4>
            <h4>uid: {user?.uid}</h4>
          </Item>
          <Item>
            <Button variant="contained" fullWidth onClick={userAuth.logout}>
              Logout
            </Button>
          </Item>
          <Item>
            <Button variant="contained" fullWidth onClick={checklogin}>
              Am I logged in?
            </Button>
          </Item>
          <Item>
            <Button variant="contained" fullWidth startIcon={<GoogleIcon />} onClick={handleGoogleSignup}>
              Mit Google registrieren
            </Button>
          </Item>
          <Item>
            <Button variant="contained" fullWidth startIcon={<EmailIcon />} component={Link} to="/signup">
              Meine Email verwenden
            </Button>
          </Item>
          <Item>
            Mit der Registrierung bei KITZE stimmst du den <Link to="/legal/terms">Nutzungsbedingungen</Link> zu. Schau dir unsere{' '}
            <Link to="/legal/policy">Datenschutz-Bestimmungen</Link> an.
          </Item>
          <Item>
            Bereits Mitglied? <Link to="/signin">Anmelden</Link>
          </Item>
        </Box>
      </MainContainer>
    </>
  );
};

export default Home;
