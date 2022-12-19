import dayjs, { Dayjs } from 'dayjs';
import { IHoliday, IWorkingdays } from '../interfaces/Types';
import holidaysJson from './Holidays.json';
import TimeUtils from './TimeUtils';

export const checkIsWorkday = (workingdays: IWorkingdays, day: Dayjs, state: string) => {
  const workday = TimeUtils.checkWorkday(day, workingdays);
  const holiday = isHoliday(day, state);
  if (holiday) return false;
  if (workday) return true;
  return false;
};

export const isHolidayOrWeekend = (day: Dayjs): boolean => {
  if (day.format('dddd') == 'Samstag' || day.format('dddd') == 'Sonntag') return true;

  return false;
};

export const isHoliday = (date: Dayjs, state: string): boolean => {
  let check = false;
  const holidays: IHoliday[] = holidaysJson;
  holidays.map((holiday) => {
    type ObjectKey = keyof typeof holiday;
    const stateShort = stateMapper(state) as ObjectKey;
    const holidayDate = dayjs(holiday.date);
    if (holidayDate.isSame(date, 'day')) {
      if (holiday[stateShort] == '1') {
        check = true;
      }
    }
  });

  return check;
};

const stateMapper = (state: string): string => {
  if (state == 'Baden-Württemberg') return 'bw';
  if (state == 'Bayern') return 'by';
  if (state == 'Berlin') return 'be';
  if (state == 'Brandenburg') return 'bb';
  if (state == 'Bremen') return 'hb';
  if (state == 'Hamburg') return 'hh';
  if (state == 'Hessen') return 'he';
  if (state == 'Mecklenburg-Vorpommern') return 'mv';
  if (state == 'Niedersachsen') return 'ni';
  if (state == 'Nordrhein-Westfalen') return 'nw';
  if (state == 'Rheinland-Pfalz') return 'rp';
  if (state == 'Saarland') return 'sl';
  if (state == 'Sachsen-Anhalt') return 'st';
  if (state == 'Sachsen') return 'sn';
  if (state == 'Schleswig-Holstein') return 'sh';
  if (state == 'Thüringen') return 'th';
  return 'unknown';
};

const absenceColors = {
  urlaub: '#56E7FA',
  krankheit: '#FD939D',
  gleittag: '#7EFABC',
  weitere: '#B9FD92',
  keinArbeitstag: '#DEEBE8',
};

const absenceCalendarColor = (absencetype: string): string => {
  if (absencetype == 'Urlaub') return absenceColors.urlaub;
  if (absencetype == 'Krankheit') return absenceColors.krankheit;
  if (absencetype == 'Gleittag') return absenceColors.gleittag;
  if (absencetype == 'Unbezahlter Urlaub') return absenceColors.weitere;
  if (absencetype == 'Eigene Eheschließung') return absenceColors.weitere;
  if (absencetype == 'Niederkunft Ehefrau') return absenceColors.weitere;
  if (absencetype == 'Eheschließung Kind') return absenceColors.weitere;
  if (absencetype == 'Tod Familienagehöriger') return absenceColors.weitere;
  if (absencetype == 'Golde Hochzeit Eltern') return absenceColors.weitere;
  if (absencetype == 'Umzug') return absenceColors.weitere;
  if (absencetype == 'Schulung') return absenceColors.weitere;

  return '';
};

export default { isHoliday, checkIsWorkday, absenceCalendarColor, absenceColors };
