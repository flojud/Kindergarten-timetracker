import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, TextField } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from '../components/Item';
import MainContainer from '../components/MainContainer';
import { AuthContext } from '../contexts/AuthContextProvider';

const SignIn = () => {
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
            <h2>Anmelden</h2>
          </Item>
          <Item>
            <Button variant="contained" fullWidth startIcon={<GoogleIcon />} onClick={handleGoogleSignIn}>
              Melde dich mit Google an
            </Button>
          </Item>
          <Item>oder mit deiner E-Mail-Adresse</Item>
          <Item>
            <TextField required fullWidth id="email" label="Email" onChange={(e) => setEmail(e.target.value)} />
          </Item>
          <Item>
            <TextField required fullWidth id="password" label="Passwort" type="password" onChange={(e) => setPassword(e.target.value)} />
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
