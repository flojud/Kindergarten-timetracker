import { Dayjs } from 'dayjs';
import { IWorkingdays } from '../interfaces/Profile';

export const numWorkdays = (workingdays: IWorkingdays): number => {
  let num = 0;
  if (workingdays.monday) num++;
  if (workingdays.tuesday) num++;
  if (workingdays.wednesday) num++;
  if (workingdays.thursday) num++;
  if (workingdays.friday) num++;
  if (workingdays.saturday) num++;
  if (workingdays.sunday) num++;
  return num;
};

export const checkWorkday = (day: Dayjs, workingdays: IWorkingdays): boolean => {
  if (day.format('dddd') == 'Montag' && workingdays.monday) return true;
  if (day.format('dddd') == 'Dienstag' && workingdays.tuesday) return true;
  if (day.format('dddd') == 'Mittwoch' && workingdays.wednesday) return true;
  if (day.format('dddd') == 'Donnerstag' && workingdays.thursday) return true;
  if (day.format('dddd') == 'Freitag' && workingdays.friday) return true;
  if (day.format('dddd') == 'Samstag' && workingdays.saturday) return true;
  if (day.format('dddd') == 'Sonntag' && workingdays.sunday) return true;
  return false;
};

export const minutesFromTime = (time: string): number => {
  const array = time.split(':');
  return parseInt(array[0], 10) * 60 + parseInt(array[1], 10);
};

export const minutesToTime = (minutes: number): string => {
  return [minutes / 60, minutes % 60]
    .join(':')
    .replace(/\b(\d)\b/g, '0$1')
    .replace(/^00:/, '');
};

export default { numWorkdays, checkWorkday, minutesFromTime, minutesToTime };
