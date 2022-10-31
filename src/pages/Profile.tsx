import Settings from '../components/settings/Settings';

const Profile = () => {
  /*
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '../firebase/Firebase';
  import { IProfile } from '../interfaces/Profile';

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
  */

  return (
    <>
      <h1>Settings</h1>
      <Settings />
    </>
  );
};

export default Profile;
