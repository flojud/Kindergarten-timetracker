import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Box, Button, Link, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from '../components/Item';
import MainContainer from '../components/MainContainer';
import { AuthContext } from '../contexts/AuthContextProvider';

const SignUp = () => {
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
            <h2>Tritt noch heute KITZE bei, es ist kostenlos.</h2>
          </Item>
          <Item>
            <TextField fullWidth required id="email" label="Email" onChange={(e) => setEmail(e.target.value)} />
          </Item>
          <Item>
            <TextField fullWidth required id="password" label="Passwort" type="password" onChange={(e) => setPassword(e.target.value)} />
          </Item>
          <Item>
            <Button fullWidth variant="contained" startIcon={<PersonAddAltIcon />} onClick={handleSubmit}>
              Registrieren
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

export default SignUp;
