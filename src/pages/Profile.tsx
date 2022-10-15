import { collection, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/Firebase';
import { IProfile } from '../interfaces/Profile';

const Profile = () => {
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
      <div>
        {profiles.map((profile: IProfile) => {
          return <div key={profile.uid}>{profile.surname}</div>;
        })}
      </div>
    </>
  );
};

export default Profile;
