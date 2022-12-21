import { Card, CardHeader, CardContent, TextField, Button, CardActions, Typography, Stack } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import { ReactComponent as MySecuritySvg } from '../../svg/security.svg';

const TabSecurityCard = () => {
  return (
    <>
      <Stack direction="column" alignItems="center" spacing={0}>
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
            <TextField type="password" label="Aktuelles Passwort" sx={{ width: '100%' }} />
            <TextField type="password" label="Neues Passwort" sx={{ width: '100%' }} />
            <TextField type="password" label="Neues Passwort erneut eingeben" sx={{ width: '100%' }} />
          </CardContent>
          <CardActions
            sx={{
              padding: 2,
              gap: 2,
            }}>
            <Button variant="contained" startIcon={<KeyIcon sx={{ color: 'text.primary' }} />} color="secondary" disabled>
              <Typography variant="button" display="block" color={'text.primary'}>
                Speichern
              </Typography>
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </>
  );
};

export default TabSecurityCard;
