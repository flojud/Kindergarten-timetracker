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
