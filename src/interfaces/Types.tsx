import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import { AlertColor } from '@mui/material';
import { User, UserCredential } from 'firebase/auth';

export const absenceTypes = ['Urlaub', 'Unbezahlter Urlaub', 'Sonderurlaub', 'Gleittag', 'Krankheit'];

export interface IAbsence {
  day: string;
  timestamp: number;
  absencetype: string;
}

export interface IDateRange {
  from: Dayjs | null;
  to: Dayjs | null;
  days: number | null;
}

export interface ITime {
  day: string;
  workingTime: number;
  availableTime: number;
  notes: string;
  timestamp: number;
  workday: boolean;
}

export type Props = { children: ReactNode | any };

export interface IProfile {
  availabletime: number;
  workingtime: number;
  workingdays: IWorkingdays;
  holidays: number;
  state: string;
  numWorkday: number;
}

export interface IWorkingdays {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface INotificationContext {
  notification: INotification | null;
  addNotification: (message: string, severity: AlertColor) => void;
  removeNotification: () => void;
}

export interface INotification {
  message: string | null;
  severity: AlertColor | null;
}

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

export interface IHoliday {
  date: string;
  fname: string;
  all_states: string;
  bw: string;
  by: string;
  be: string;
  bb: string;
  hb: string;
  hh: string;
  he: string;
  mv: string;
  ni: string;
  nw: string;
  rp: string;
  sl: string;
  sn: string;
  st: string;
  sh: string;
  th: string;
  comment: string;
}
