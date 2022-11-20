import { Button, Card, CardContent, Stack, TextField } from '@mui/material';
import { LocalizationProvider, PickersDay, pickersDayClasses, PickersDayProps, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import locale from 'dayjs/locale/de';
import { profile } from 'console';
import HolidayUtils from '../../utils/HolidayUtils';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { IProfile } from '../../interfaces/Types';
import MainContainer from '../common/MainContainer';
import NewAbsence from './NewAbsence';

type HighlightedDay = {
  date: Dayjs;
  styles: React.CSSProperties;
};

const AbsencesYearPage = () => {
  const [value, setValue] = useState<Dayjs | null>(null);
  const [month, setMonth] = useState<Dayjs | null>(null);
  const [days, setDays] = useState<Dayjs[]>([]);
  const [showAbsenceButton, setShowAbsenceButton] = useState<boolean>(true);
  const [highlightedDays, setHighlightedDays] = useState<HighlightedDay[]>([]);
  const authContext = useContext(AuthContext);
  const profile = authContext!.profile as IProfile;

  /*
  Everytime the date range changes it checks for workdays,
  weekends, holidays, vacation, etc and colors the days.
  */
  useEffect(() => {
    setHighlightedDays([]);
    days.forEach((day) => {
      // check if it is a holiday

      // check if it is a workday
      const isWorkday = HolidayUtils.checkIsWorkday(profile.workingdays, day.locale({ ...locale }), profile.state);
      if (!isWorkday) setHighlightedDays((prevState) => [...prevState, { date: day, styles: { backgroundColor: '#f5f5f5' } }]);
    });
  }, [days]);

  /*
  Simple Date Range calculation based on the calendar selection
  */
  const setDaysRange = (from: Dayjs, to: Dayjs) => {
    setDays([]);
    const d = Math.ceil(to.diff(from, 'day', true));
    for (let i = 0; i < d; i++) {
      const nextDay = from.add(i, 'day');
      setDays((prevState) => [...prevState, nextDay]);
    }
  };

  /* 
  When you click in the calender and pick another date,
  it will set the new date range.
  */
  useEffect(() => {
    let from;
    let to;
    if (value) {
      from = value.locale({ ...locale }).startOf('month');
      to = value.locale({ ...locale }).endOf('month');
    } else {
      from = dayjs()
        .locale({ ...locale })
        .startOf('month');
      to = dayjs()
        .locale({ ...locale })
        .endOf('month');
    }

    setDaysRange(from, to);
  }, [value]);

  /*
  When you switch in the calendar between months,
  it sets a new date range.
  */
  useEffect(() => {
    if (month) {
      const from = month.locale({ ...locale }).startOf('month');
      const to = month.locale({ ...locale }).endOf('month');
      setDaysRange(from, to);
    }
  }, [month]);

  const renderWeekPickerDay = (date: Dayjs, selectedDates: Array<Dayjs | null>, pickersDayProps: PickersDayProps<Dayjs>) => {
    if (highlightedDays) {
      const matchedStyles = highlightedDays.reduce((a, v) => {
        return date.isSame(v.date) ? v.styles : a;
      }, {});
      return <PickersDay {...pickersDayProps} sx={{ ...matchedStyles }} />;
    } else {
      return <PickersDay {...pickersDayProps} />;
    }
  };
  return (
    <>
      <MainContainer>
        <Stack spacing={2}>
          <Card>
            <CardContent>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={value}
                  onMonthChange={(newMonth) => {
                    setMonth(newMonth);
                  }}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  renderDay={renderWeekPickerDay}
                />
              </LocalizationProvider>
            </CardContent>
          </Card>
          {showAbsenceButton ? (
            <Button variant="contained" fullWidth onClick={() => setShowAbsenceButton(false)}>
              Neue Abwesenheit
            </Button>
          ) : (
            <NewAbsence />
          )}
        </Stack>
      </MainContainer>
    </>
  );
};

export default AbsencesYearPage;
