import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, UserCredential } from 'firebase/auth';

import { auth } from '../firebase/Firebase';
import { IUser } from '../interfaces/User';
import { Props } from '../interfaces/Props';
import { UserContextInterface } from '../interfaces/UserContextInterface';

export const UserContext = createContext<UserContextInterface>({} as UserContextInterface);

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as IUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={{ createUser, user, logout, signIn }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
