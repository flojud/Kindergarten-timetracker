import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/Firebase';
import useNotification from '../hooks/useNotification';
import { Props, IProfile, IUserContext as IAuthContext } from '../interfaces/Types';

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const { notifyContext } = useNotification();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        setUser({ ...response.user });
        navigate('/profile');
      })
      .catch((error) => {
        console.log(error);
        notifyContext.addNotification('Fehler beim Anmelden mit Google', 'error');
      });
  };

  const logout = () => {
    signOut(auth)
      .then((response) => {
        console.log(response);
        setUser({} as User);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        notifyContext.addNotification('Fehler beim Logout', 'error');
      });
  };

  const [profile, setProfile] = useState<IProfile | null>(null);
  const loadProfile = async () => {
    if (user?.uid) {
      const docRef = doc(db, `profiles/${user.uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data() as IProfile);
      } else {
        notifyContext.addNotification('Fehler beim Laden deines Profiles', 'error');
      }
    }
  };

  const updateProfile = (profile: IProfile) => {
    if (user?.uid) {
      setDoc(doc(db, `profiles/${user.uid}`), {
        availabletime: profile.availabletime,
        workingtime: profile.workingtime,
        workingdays: {
          monday: profile.workingdays.monday,
          tuesday: profile.workingdays.tuesday,
          wednesday: profile.workingdays.wednesday,
          thursday: profile.workingdays.thursday,
          friday: profile.workingdays.friday,
          saturday: profile.workingdays.saturday,
          sunday: profile.workingdays.sunday,
        },
        holidays: profile.holidays as number,
        state: profile.state,
      })
        .then(() => {
          notifyContext.addNotification('Einstellungen erfoglreich gespeichert', 'success');
        })
        .catch((error) => {
          console.log(error);
          notifyContext.addNotification('Fehler beim Speichern deines Profils', 'error');
        })
        .finally(() => {
          loadProfile();
        });
    }
  };

  useEffect(() => {
    if (user?.uid) {
      loadProfile();
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({ ...currentUser });
      }
    });
    return unsubscribe;
  }, []);

  const authMethods = { createUser, logout, signIn, googleSignIn };

  return (
    <AuthContext.Provider value={{ user, profile, updateProfile, loggedIn, authMethods: authMethods }}>{children}</AuthContext.Provider>
  );
};
