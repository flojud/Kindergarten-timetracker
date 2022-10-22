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
        setUser({ ...(response.user as IUser) });
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
      setUser({ ...(currentUser as IUser) });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userAuth = { createUser, logout, signIn, googleSignIn };
  const [values, setValues] = useState<UserContextInterface>({ user, userAuth } as UserContextInterface);

  useEffect(() => {
    setValues({ user, userAuth } as UserContextInterface);
  }, [user]);

  //return <UserContext.Provider value={{ user, userAuth }}>{children}</UserContext.Provider>;
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
