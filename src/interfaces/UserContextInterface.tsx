import { UserCredential } from "firebase/auth";
import { IUser } from "./User";

export interface UserContextInterface {
  createUser: (email: string, password: string) => void, 
  user: IUser | null,
  logout: () => void;
  signIn: (email: string, password: string) => Promise<UserCredential>;
}