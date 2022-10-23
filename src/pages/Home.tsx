import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Item from '../components/Item';
import MainContainer from '../components/MainContainer';
import { useAuthContext } from '../contexts/AuthContextProvider';

const Home = () => {
  const authContext = useAuthContext();

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
