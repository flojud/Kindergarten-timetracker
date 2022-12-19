import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from './common/Item';
import MainContainer from './common/MainContainer';
import { AuthContext } from '../contexts/AuthContextProvider';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!authContext) {
      setError('Login not possible.');
      return;
    }
    setError('');
    try {
      await authContext.authMethods.createUser(email, password);
      navigate('/');
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
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
            <Typography variant="h2">Tritt noch heute KITZE bei, es ist kostenlos.</Typography>
          </Item>
          <Item>
            <TextField fullWidth required id="email" label="Email" onChange={(e) => setEmail(e.target.value)} />
          </Item>
          <Item>
            <TextField fullWidth required id="password" label="Passwort" type="password" onChange={(e) => setPassword(e.target.value)} />
          </Item>
          <Item>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PersonAddAltIcon sx={{ color: 'text.primary' }} />}
              onClick={handleSubmit}
              color="secondary">
              <Typography variant="button" display="block" color={'text.primary'}>
                Registrieren
              </Typography>
            </Button>
          </Item>
          <Item>
            <Typography variant="body1">
              Mit der Registrierung bei KITZE stimmst du den <Link href="/legal/terms">Nutzungsbedingungen</Link> zu. Schau dir unsere{' '}
              <Link href="/legal/policy">Datenschutz-Bestimmungen</Link> an.
            </Typography>
          </Item>
          <Item>
            <Typography variant="body1">
              Bereits Mitglied? <Link href="/signin">Anmelden</Link>
            </Typography>
          </Item>
        </Box>
      </MainContainer>
    </>
  );
};

export default SignUpPage;
