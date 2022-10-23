import { User, UserCredential } from 'firebase/auth';

export interface IUserContext {
  user: User | null;
  authMethods: IAuthMethods;
}

export interface IAuthMethods {
  createUser: (email: string, password: string) => void;
  logout: () => void;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn: () => void;
}
