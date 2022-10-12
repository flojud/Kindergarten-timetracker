export interface IProfile {
  availabletime: number;
  workingtime: number;
  workingdays: IWorkingdays;
  name: string;
  state: string;
  surname: string;
  uid: string;
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
