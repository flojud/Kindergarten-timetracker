import { Dayjs } from 'dayjs';

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
}
