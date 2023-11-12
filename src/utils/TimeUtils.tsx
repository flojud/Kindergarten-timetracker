import dayjs, { Dayjs } from 'dayjs';
import locale from 'dayjs/locale/de';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { IProfile, ITime, IWorkingdays } from '../interfaces/Types';
import HolidayUtils from './HolidayUtils';

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
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hourString = hours.toString().padStart(2, '0');
  const minutesString = remainingMinutes.toString().padStart(2, '0');
  return `${hourString}:${minutesString}`;
};

export const negativeMinutesToTime = (min: number): string => {
  if (min.toString().includes('-')) {
    const m = min * -1;
    return '-' + minutesToTime(m);
  } else {
    return minutesToTime(min);
  }
};

/* Unixtimestamp GMT */
export const dateStringToTimestamp = (date: string): number => {
  return dayjs(date).unix();
};

export const dateStringToWeek = (date: string): number => {
  dayjs.extend(weekOfYear);
  return dayjs(date)
    .locale({ ...locale })
    .week();
};

export const dateStringToMonthYear = (date: string): string => {
  return dayjs(date)
    .locale({ ...locale })
    .format('MMMM  YYYY');
};

export const defaultTime = (day: Dayjs, profile: IProfile): ITime => {
  const time: ITime = {} as ITime;
  time.day = day.format('YYYY-MM-DD');
  time.notes = '';

  if (HolidayUtils.checkIsWorkday(profile.workingdays, day, profile.state)) {
    time.workingTime = profile.workingtime;
    time.availableTime = profile.availabletime;
    time.workday = true;
  } else {
    time.workingTime = 0;
    time.availableTime = 0;
    time.workday = false;
  }

  return time;
};
export default {
  numWorkdays,
  checkWorkday,
  minutesFromTime,
  minutesToTime,
  dateStringToTimestamp,
  defaultTime,
  negativeMinutesToTime,
  dateStringToWeek,
  dateStringToMonthYear,
};
