import { Card, CardHeader, CardContent, Box, TextField, Button, CardActions, Typography } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
const TabSecurityCard = () => {
  return (
    <>
      <Card>
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
          <Button variant="contained" startIcon={<KeyIcon />}>
            <Typography variant="button" display="block">
              Speichern
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default TabSecurityCard;
