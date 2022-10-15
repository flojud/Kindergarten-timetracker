import { Button, Grid } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import MainContainer from '../components/MainContainer';
import { UserContext } from '../contexts/AuthContextProvider';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import Item from '../components/Item';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../interfaces/User';

const Home = () => {
  const userAuth = useContext(UserContext);

  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [user, setUser] = useState<IUser>();

  const handleGoogleSignup = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user);
        setUser(response.user as IUser);
        navigate('/profile');
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  return (
    <>
      <MainContainer>
        <Item>
          <h2>Die beste Zeiterfassung App für Erzieher:innen</h2>
        </Item>
        <Item>
          <Button variant="contained" startIcon={<GoogleIcon />} onClick={handleGoogleSignup}>
            Mit Google registrieren
          </Button>
        </Item>
        <Item>
          <Button variant="contained" startIcon={<EmailIcon />} component={Link} to="/signup">
            Meine Email verwenden
          </Button>
        </Item>
        <Item>
          Mit der Registrierung bei KITZE stimmst du den <Link to="/legal/terms">Nutzungsbedingungen</Link> zu. Schau dir unsere{' '}
          <Link to="/legal/policy">Datenschutz-Bestimmungen</Link> an.
        </Item>
        <Item>
          Bereits Mitglied? <Link to="/login">Anmelden</Link>
        </Item>
      </MainContainer>
    </>
  );
};

export default Home;
