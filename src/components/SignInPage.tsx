import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, TextField, Typography } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from './common/Item';
import MainContainer from './common/MainContainer';
import { AuthContext } from '../contexts/AuthContextProvider';

const SignInPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    if (!authContext) {
      setError('Sign in not possible');
      return;
    }
    authContext.authMethods.googleSignIn();
  };

  const handlsignInWithEmail = async (e: any) => {
    e.preventDefault();
    if (!authContext) {
      setError('Sign in not possible');
      return;
    }
    setError('');
    try {
      await authContext.authMethods.signIn(email, password);
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
            <Typography variant="h2" gutterBottom>
              Anmelden
            </Typography>
          </Item>
          <Item>
            <Button variant="contained" fullWidth startIcon={<GoogleIcon />} onClick={handleGoogleSignIn}>
              <Typography variant="button" display="block">
                Melde dich mit Google an
              </Typography>
            </Button>
          </Item>
          <Item>
            <Typography variant="body1">oder mit deiner E-Mail-Adresse</Typography>
          </Item>
          <Item>
            <TextField required fullWidth id="email" label="Email" onChange={(e) => setEmail(e.target.value)} />
          </Item>
          <Item>
            <TextField required fullWidth id="password" label="Passwort" type="password" onChange={(e) => setPassword(e.target.value)} />
          </Item>
          <Item>
            <Button variant="contained" fullWidth onClick={handlsignInWithEmail}>
              <Typography variant="button" display="block">
                Anmelden
              </Typography>
            </Button>
          </Item>
          <Item>
            <Button fullWidth onClick={handlePasswordResetEmail}>
              <Typography variant="button" display="block">
                Kennwort vergessen?
              </Typography>
            </Button>
          </Item>
        </Box>
      </MainContainer>
    </>
  );
};

export default SignInPage;
