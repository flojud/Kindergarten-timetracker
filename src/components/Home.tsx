import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Link } from '@mui/material';
import Item from './common/Item';
import MainContainer from './common/MainContainer';
import { AuthContext } from '../contexts/AuthContextProvider';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';

const Home = () => {
  const authContext = useContext(AuthContext);

  const handleGoogleSignup = async () => {
    authContext?.authMethods.googleSignIn();
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
          </Item>
          <Item>
            <Button variant="contained" fullWidth startIcon={<GoogleIcon />} onClick={handleGoogleSignup}>
              Mit Google registrieren
            </Button>
          </Item>
          <Item>
            <Button variant="contained" fullWidth startIcon={<EmailIcon />} component={RouterLink} to="/signup">
              Meine Email verwenden
            </Button>
          </Item>
          <Item>
            Mit der Registrierung bei KITZE stimmst du den <Link href="/legal/terms">Nutzungsbedingungen</Link> zu. Schau dir unsere{' '}
            <Link href="/legal/policy">Datenschutz-Bestimmungen</Link> an.
          </Item>
          <Item>
            Bereits Mitglied? <Link href="/signin">Anmelden</Link>
          </Item>
        </Box>
      </MainContainer>
    </>
  );
};

export default Home;
