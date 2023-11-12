import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextProvider';
import { ReactComponent as HomeSvg } from '../svg/home.svg';
import Item from './common/Item';

const UnautheticatedHomePage = () => {
  const authContext = useContext(AuthContext);

  const handleGoogleSignup = async () => {
    authContext?.authMethods.googleSignIn();
  };
  return (
    <>
      <Stack direction="column" alignItems="center" spacing={0}>
        <HomeSvg width="150px" height="150px" />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            maxWidth: '400px',
          }}>
          <Item>
            <Typography variant="h2" gutterBottom>
              Die beste Zeiterfassung App für Erzieher:innen
            </Typography>
          </Item>
          <Item>
            <Button
              variant="contained"
              fullWidth
              startIcon={<GoogleIcon sx={{ color: 'text.primary' }} />}
              onClick={handleGoogleSignup}
              color="secondary">
              <Typography variant="button" display="block" color="text.primary">
                Mit Google registrieren
              </Typography>
            </Button>
          </Item>
          <Item>
            <Button
              variant="contained"
              fullWidth
              startIcon={<EmailIcon sx={{ color: 'text.primary' }} />}
              component={RouterLink}
              to="/signup"
              color="secondary">
              <Typography variant="button" display="block" color="text.primary">
                Meine Email verwenden
              </Typography>
            </Button>
          </Item>
          <Item>
            <Typography variant="body1" gutterBottom>
              Mit der Registrierung bei KITZE stimmst du den <Link href="/legal/terms">Nutzungsbedingungen</Link> zu. Schau dir unsere{' '}
              <Link href="/legal/policy">Datenschutz-Bestimmungen</Link> an.
            </Typography>
          </Item>
          <Item>
            <Typography variant="body1" gutterBottom>
              Bereits Mitglied? <Link href="/signin">Anmelden</Link>
            </Typography>
          </Item>
        </Box>
      </Stack>
    </>
  );
};

export default UnautheticatedHomePage;
