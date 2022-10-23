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
    signOut(auth);
    navigate(0);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({ ...currentUser });
      }
    });
    return unsubscribe;
  }, []);

  const authMethods = { createUser, logout, signIn, googleSignIn };

  const [context, setContext] = useState<IAuthContext>({ user, authMethods });

  useEffect(() => {
    setContext({ user, authMethods: authMethods });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
