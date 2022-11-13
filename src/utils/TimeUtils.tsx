import dayjs, { Dayjs } from 'dayjs';
import { IProfile, IWorkingdays } from '../interfaces/Types';
import { ITime } from '../interfaces/Types';
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
  //console.log(day.format('dddd'));
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
  let res = '';
  if (minutes == 0) {
    res = '00:00';
  } else {
    res = [Math.floor(minutes / 60), minutes % 60]
      .join(':')
      .replace(/\b(\d)\b/g, '0$1')
      .replace(/^00:/, '');
  }
  //console.log("input: " +  minutes + " result: " res);
  return res;
};

/* Unixtimestamp GMT */
export const dateStringToTimestamp = (date: string): number => {
  return dayjs(date).unix();
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
export default { numWorkdays, checkWorkday, minutesFromTime, minutesToTime, dateStringToTimestamp, defaultTime };
