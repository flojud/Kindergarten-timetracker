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

  const checklogin = () => {
    if (authContext?.user?.uid) {
      console.log(authContext.user);
    } else {
      console.log(false);
    }
  };

  if (!authContext || !authContext.user) {
    return <h1>Please login</h1>;
  }

  const { user, authMethods } = authContext;

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
            <h3>name: {user.email}</h3>
            <h4>anonymous: {user.isAnonymous.toString()}</h4>
            <h4>uid: {user.uid}</h4>
          </Item>
          <Item>
            <Button variant="contained" fullWidth onClick={authMethods.logout}>
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
