import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from './common/Item';
import MainContainer from './common/MainContainer';
import { AuthContext } from '../contexts/AuthContextProvider';
import { ReactComponent as LoginSvg } from '../svg/login.svg';

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
        <Stack direction="column" alignItems="center" spacing={0}>
          <LoginSvg width="150px" height="150px" />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              maxWidth: '400px',
            }}>
            <Item alignSelf={'center'}>
              <Typography variant="h2" gutterBottom>
                Anmelden
              </Typography>
            </Item>
            <Item>
              <Button variant="contained" fullWidth startIcon={<GoogleIcon sx={{ color: 'text.primary' }} />} onClick={handleGoogleSignIn}>
                <Typography variant="button" display="block" color={'text.secondary'}>
                  Melde dich mit Google an
                </Typography>
              </Button>
            </Item>
            <Item alignSelf={'center'}>
              <Typography variant="body1">oder mit deiner E-Mail-Adresse</Typography>
            </Item>
            <Item>
              <TextField required fullWidth id="email" label="Email" onChange={(e) => setEmail(e.target.value)} />
            </Item>
            <Item>
              <TextField required fullWidth id="password" label="Passwort" type="password" onChange={(e) => setPassword(e.target.value)} />
            </Item>
            <Item>
              <Button variant="contained" fullWidth onClick={handlsignInWithEmail} color="secondary">
                <Typography variant="button" display="block" color={'text.primary'}>
                  Anmelden
                </Typography>
              </Button>
            </Item>
            <Item>
              <Button fullWidth onClick={handlePasswordResetEmail} color="secondary">
                <Typography variant="button" display="block" color={'text.primary'}>
                  Kennwort vergessen?
                </Typography>
              </Button>
            </Item>
          </Box>
        </Stack>
      </MainContainer>
    </>
  );
};

export default SignInPage;
