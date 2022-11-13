import { Avatar, Box, Card, CardContent, CardHeader, TextField } from '@mui/material';
import { User } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';

const MyProfile = () => {
  const authContext = useContext(AuthContext);

  const user = authContext!.user as User;
  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar alt={user!.displayName!} src={user!.photoURL!} />}
          title={user.displayName}
          subheader={`Letzter Login ${user.metadata.lastSignInTime}`}></CardHeader>
        <CardContent>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'center',
              padding: 2,
              gap: 2,
            }}
            noValidate
            autoComplete="off">
            <TextField disabled label="Email" value={user.email} sx={{ width: '100%' }} />
            <TextField disabled label="Telefon" value={user.phoneNumber} sx={{ width: '100%' }} />
          </Box>

          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'center',
              padding: 2,
              gap: 2,
            }}>
            <TextField disabled label="UID" value={user.uid} sx={{ width: '100%' }} />
            <TextField disabled label="ProviderId" value={user.providerId} sx={{ width: '100%' }} />
          </Box>

          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'center',
              padding: 2,
              gap: 2,
            }}>
            <TextField disabled label="Erstellt am" value={user.metadata.creationTime} sx={{ width: '100%' }} />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default MyProfile;
