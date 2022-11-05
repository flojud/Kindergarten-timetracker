import { User, UserCredential } from 'firebase/auth';
import { IProfile } from './Profile';

export interface IUserContext {
  user: User | null;
  loggedIn: boolean;
  profile: IProfile | null;
  updateProfile: (profile: IProfile) => void;
  authMethods: IAuthMethods;
}

export interface IAuthMethods {
  createUser: (email: string, password: string) => void;
  logout: () => void;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn: () => void;
}
