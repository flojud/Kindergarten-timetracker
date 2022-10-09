import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from 'firebase/auth';

import { auth } from '../Firebase';
import { IUser } from '../interfaces/User';

type Props = { children: ReactNode }

interface UserContextInterface {
  createUser: (email: string, password: string) => void, 
  user: IUser | null,
  logout: () => void;
  signIn: (email: string, password: string) => Promise<UserCredential>;
}

export const UserContext = createContext<UserContextInterface>({} as UserContextInterface);

export const AuthContextProvider: FC<Props> = ({children}) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const signIn = (email: string, password: string) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }

  const logout = () => {
      return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as IUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};