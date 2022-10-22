import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Item from '../components/Item';
import MainContainer from '../components/MainContainer';
import { UserAuth } from '../contexts/AuthContextProvider';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { userAuth } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    try {
      await userAuth.createUser(email, password);
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
            <TextField fullWidth required id="outlined-required" label="Email" onChange={(e) => setEmail(e.target.value)} />
          </Item>
          <Item>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Passwort"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Item>
          <Item>
            <Button fullWidth variant="contained" startIcon={<PersonAddAltIcon />} onClick={handleSubmit}>
              Registrieren
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

export default Signup;
