import { UserCredential } from 'firebase/auth';
import { IUser } from './User';

export interface UserContextInterface {
  user: IUser | null;
  userAuth: IAuth;
}

export interface IAuth {
  createUser: (email: string, password: string) => void;
  logout: () => void;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn: () => void;
}
