import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/Firebase';
import { Props } from '../interfaces/Props';
import { IUserContext as IAuthContext } from '../interfaces/UserContextInterface';

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider: FC<Props> = ({ children }) => {
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
      });
  };

  useEffect(() => {
    if (user?.uid) {
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

  return <AuthContext.Provider value={{ user, loggedIn, authMethods: authMethods }}>{children}</AuthContext.Provider>;
};
