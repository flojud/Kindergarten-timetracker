/* eslint-disable react-hooks/exhaustive-deps */
import CircleIcon from '@mui/icons-material/Circle';
import { Button, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider, PickersDay, PickersDayProps, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/de';
import locale from 'dayjs/locale/de';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import useStore from '../../hooks/useStore';
import { IProfile } from '../../interfaces/Types';
import { ReactComponent as AirportSvg } from '../../svg/airport.svg';
import HolidayUtils from '../../utils/HolidayUtils';
import MainContainer from '../common/MainContainer';
import AbsencesCard from './AbsencesCard';
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
  const { getAbsence } = useStore();

  /*
  Everytime the date range changes it checks for workdays,
  weekends, holidays, vacation, etc and colors the days.
  */
  useEffect(() => {
    setHighlightedDays([]);
    days.forEach((day) => {
      // check if it is a workday
      const isWorkday = HolidayUtils.checkIsWorkday(profile.workingdays, day.locale({ ...locale }), profile.state);
      if (!isWorkday)
        setHighlightedDays((prevState) => [
          ...prevState,
          { date: day, styles: { backgroundColor: HolidayUtils.absenceColors.keinArbeitstag } },
        ]);

      // check if it is a holiday
      getAbsence(day.unix())
        .then((absence) => {
          if (absence && absence.absencetype) {
            setHighlightedDays((prevState) => [
              ...prevState,
              { date: day, styles: { backgroundColor: HolidayUtils.absenceCalendarColor(absence.absencetype) } },
            ]);
          }
        })
        .finally(() => {});
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
        <Stack direction="column" alignItems="center" spacing={2}>
          <AirportSvg width="150px" height="150px" />
          <Card>
            <CardContent sx={{ width: '100%', p: 0 }}>
              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" gap={0}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
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

                <List sx={{ px: 4 }}>
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <CircleIcon sx={{ color: HolidayUtils.absenceColors.schliesstag }} />
                    </ListItemIcon>
                    <ListItemText disableTypography>
                      <Typography variant="caption" color="text.secondary">
                        Schließtag
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <CircleIcon sx={{ color: HolidayUtils.absenceColors.urlaub }} />
                    </ListItemIcon>
                    <ListItemText disableTypography>
                      <Typography variant="caption" color="text.secondary">
                        Urlaub
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <CircleIcon sx={{ color: HolidayUtils.absenceColors.gleittag }} />
                    </ListItemIcon>
                    <ListItemText disableTypography>
                      <Typography variant="caption" color="text.primary">
                        Gleittag
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <CircleIcon sx={{ color: HolidayUtils.absenceColors.krankheit }} />
                    </ListItemIcon>
                    <ListItemText disableTypography>
                      <Typography variant="caption" color="text.secondary">
                        Krankheit
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <CircleIcon sx={{ color: HolidayUtils.absenceColors.weitere }} />
                    </ListItemIcon>
                    <ListItemText disableTypography>
                      <Typography variant="caption" color="text.secondary">
                        weitere
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <CircleIcon sx={{ color: HolidayUtils.absenceColors.keinArbeitstag }} />
                    </ListItemIcon>
                    <ListItemText disableTypography>
                      <Typography variant="caption" color="text.secondary">
                        kein Arbeitstag
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </CardContent>
          </Card>
          <AbsencesCard days={days} />
          {showAbsenceButton ? (
            <Button variant="contained" fullWidth onClick={() => setShowAbsenceButton(false)} color="secondary">
              <Typography variant="button" display="block" color="text.primary">
                Neue Abwesenheit
              </Typography>
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
