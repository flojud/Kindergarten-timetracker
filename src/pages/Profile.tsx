import { Avatar, Card, CardContent, CardHeader, List, ListItem, ListItemText, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { db } from '../firebase/Firebase';
import { IProfile } from '../interfaces/Profile';

const Profile = () => {
  const authContext = useAuthContext();
  const user = authContext!.user as User;

  const profilesCollectionRef = collection(db, 'profiles');
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  useEffect(() => {
    const getProfiles = async () => {
      const data = await getDocs(profilesCollectionRef);
      console.log(data);
      setProfiles(data.docs.map((doc) => ({ ...(doc.data() as IProfile) })));
    };
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar alt={user!.displayName!} src={user!.photoURL!} />}
          title={user.displayName}
          subheader={`Letzter Login ${user.metadata.lastSignInTime}`}></CardHeader>
        <CardContent>
          <List>
            <ListItem disablePadding>
              <ListItemText primary={`Email: ${user.email}`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={`Phone: ${user.phoneNumber}`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={`UID: ${user.uid}`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={`ProviderId: ${user.providerId}`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={`Erstellt am : ${user.metadata.creationTime}`} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
