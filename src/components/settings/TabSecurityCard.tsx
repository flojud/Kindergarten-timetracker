import { ErrorOutlineOutlined, Key } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardHeader, Stack, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { ReactComponent as MySecuritySvg } from '../../svg/security.svg';

const TabSecurityCard = () => {
  const authContext = useContext(AuthContext);
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');

  const changePassword = () => {
    if (password != '') {
      if (password == rePassword) {
        authContext?.authMethods.changeMyPassword(password);
      }
    }
  };

  const deleteAccount = () => {
    authContext?.authMethods.deleteMyUser();
  };

  return (
    <>
      <Stack direction="column" alignItems="center" spacing={2}>
        <MySecuritySvg width="150px" height="150px" />
        <Card sx={{ width: '100%' }}>
          <CardHeader title="Passwort"></CardHeader>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              padding: 2,
              gap: 2,
            }}>
            <TextField
              type="password"
              label="Neues Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: '100%' }}
            />
            <TextField
              type="password"
              label="Neues Passwort erneut eingeben"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              sx={{ width: '100%' }}
            />
          </CardContent>
          <CardActions
            sx={{
              padding: 2,
              gap: 2,
            }}>
            <Button variant="contained" startIcon={<Key sx={{ color: 'text.primary' }} />} color="secondary" onClick={changePassword}>
              <Typography variant="button" display="block" color="text.primary">
                Speichern
              </Typography>
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ width: '100%' }}>
          <CardHeader title="Account löschen"></CardHeader>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              padding: 2,
              gap: 2,
            }}>
            <Typography variant="body1" display="block" gutterBottom>
              Solltest du uns verlassen wollen, kannst du deinen Account mit all deinen Daten ganz einfach hier löschen. Es ist im Anschluss
              nicht mehr möglich deine Daten wiederherzustellen.
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              padding: 2,
              gap: 2,
            }}>
            <Button
              variant="contained"
              startIcon={<ErrorOutlineOutlined sx={{ color: 'text.primary' }} />}
              color="secondary"
              onClick={deleteAccount}>
              <Typography variant="button" display="block" color="text.primary">
                Löschen
              </Typography>
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </>
  );
};

export default TabSecurityCard;
