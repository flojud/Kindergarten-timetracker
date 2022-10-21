import React, { useContext, useState } from 'react';
import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../interfaces/User';
import { UserContext } from '../contexts/AuthContextProvider';
import MainContainer from '../components/MainContainer';
import Item from '../components/Item';
import { Box, Button, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import { ConstructionOutlined } from '@mui/icons-material';

const SignIn = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const userAuth = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    userAuth.googleSignIn();
  };

  const handlsignInWithEmail = async (e: any) => {
    e.preventDefault();
    setError('');
    try {
      await userAuth.signIn(email, password);
      navigate('/profile');
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const handlePasswordResetEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
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
            <h2>Anmelden</h2>
          </Item>
          <Item>
            <Button variant="contained" fullWidth startIcon={<GoogleIcon />} onClick={handleGoogleSignIn}>
              Melde dich mit Google an
            </Button>
          </Item>
          <Item>oder mit deiner E-Mail-Adresse</Item>
          <Item>
            <TextField required fullWidth id="outlined-required" label="Email" onChange={(e) => setEmail(e.target.value)} />
          </Item>
          <Item>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Passwort"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Item>
          <Item>
            <Button variant="contained" fullWidth onClick={handlsignInWithEmail}>
              Anmelden
            </Button>
          </Item>
          <Item>
            <Button fullWidth onClick={handlePasswordResetEmail}>
              Kennwort vergessen?
            </Button>
          </Item>
        </Box>
      </MainContainer>
    </>
  );
};

export default SignIn;
