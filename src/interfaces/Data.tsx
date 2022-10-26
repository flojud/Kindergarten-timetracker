import { Dayjs } from 'dayjs';

export interface IDateRange {
  from: Dayjs | null;
  to: Dayjs | null;
  days: number | null;
}
