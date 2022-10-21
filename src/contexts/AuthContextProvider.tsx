import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { auth } from '../firebase/Firebase';
import { IUser } from '../interfaces/User';
import { Props } from '../interfaces/Props';
import { UserContextInterface } from '../interfaces/UserContextInterface';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext<UserContextInterface>({} as UserContextInterface);

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({} as IUser);

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user);
        setUser(response.user as IUser);
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
      setUser(currentUser as IUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={{ createUser, user, logout, signIn, googleSignIn }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
