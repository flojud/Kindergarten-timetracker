import {
  createUserWithEmailAndPassword,
  deleteUser,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, FC, useEffect, useState } from 'react';
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
    return createUserWithEmailAndPassword(auth, email, password).then((res) => {
      sendEmailVerification(res.user);
    });
  };

  const deleteMyUser = () => {
    if (user) {
      deleteUser(user)
        .then(() => {
          notifyContext.addNotification('Dein Benutzer wurde erfolgreich gelöscht', 'success');
        })
        .catch((error) => {
          console.log(error);
          notifyContext.addNotification('Dein Benutzer konnte nicht gelöscht werden', 'error');
        });
    }
  };

  const changeMyPassword = (newPassword: string) => {
    if (user) {
      updatePassword(user, newPassword)
        .then(() => {
          notifyContext.addNotification('Dein Passwort wurde erfolgreich geändert', 'success');
        })
        .catch((error) => {
          console.log(error);
          notifyContext.addNotification('Fehler beim Ändern deines Passwort', 'error');
        });
    }
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential) {
            const token = credential.accessToken;
            // The signed-in user info.
            setUser({ ...result.user });
            navigate('/profile');
            notifyContext.addNotification('Mit Google angemeldet', 'success');
          }
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        notifyContext.addNotification('(' + errorCode + ') ' + errorMessage, 'error');
      });
  };

  const logout = () => {
    signOut(auth)
      .then((response) => {
        notifyContext.addNotification('Erfolgreich abgemeldet', 'success');
        setUser({} as User);
        navigate('/');
      })
      .catch((error) => {
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
        createInitialProfile();
        loadProfile();
      }
    }
  };

  const createInitialProfile = () => {
    if (user?.uid) {
      setDoc(doc(db, `profiles/${user.uid}`), {
        availabletime: 480,
        workingtime: 1920,
        workingdays: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
        holidays: 24,
        state: 'Baden-Württemberg',
      })
        .then(() => {
          notifyContext.addNotification('Profil erfoglreich erstellt', 'success');
        })
        .catch((error) => {
          notifyContext.addNotification('Fehler beim Erstellen deines Profils', 'error');
        });
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
          setProfile(profile);
          notifyContext.addNotification('Einstellungen erfoglreich gespeichert', 'success');
        })
        .catch((error) => {
          notifyContext.addNotification('Fehler beim Speichern deines Profils', 'error');
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

  const authMethods = { createUser, logout, signIn, googleSignIn, deleteMyUser, changeMyPassword };

  return (
    <AuthContext.Provider value={{ user, profile, updateProfile, loggedIn, authMethods: authMethods }}>{children}</AuthContext.Provider>
  );
};
