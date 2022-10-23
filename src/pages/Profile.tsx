import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { db } from '../firebase/Firebase';
import { IProfile } from '../interfaces/Profile';

const Profile = () => {
  const authContext = useAuthContext();

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

  if (!authContext || !authContext.user) {
    return <h1>Please login</h1>;
  }

  return (
    <>
      <h1>Hallo {authContext?.user?.displayName}</h1>
      <div>
        {profiles.map((profile: IProfile) => {
          return <div key={profile.uid}>{profile.surname}</div>;
        })}
      </div>
    </>
  );
};

export default Profile;
