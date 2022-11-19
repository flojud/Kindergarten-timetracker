import React, { useEffect, useState } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import MonthPicker from '../common/MonthPicker';
import MainContainer from '../common/MainContainer';
import ViewDate from './TimeHistoryCard';
import useStore from '../../hooks/useStore';
import { ITime } from '../../interfaces/Types';
import TimeUtils from '../../utils/TimeUtils';

const TimeHistoryPage = () => {
  const { getTimes } = useStore();
  const [days, setDays] = useState<Dayjs[]>([]);
  const [times, setTimes] = useState<ITime[] | null>(null);
  const [workingTimeGlz, setWorkingTimeGlz] = useState<string | null>(null);
  const [availableTimeGlz, setAvailableTimeGlz] = useState<string | null>(null);

  const handleDateRangePicker = (dates: Dayjs[]) => {
    setDays(dates);
  };

  /*
  Simply sumup all wokring and available times reveived
  from Firestore DB and convert from a number to time string.
  */
  useEffect(() => {
    if (times) {
      let workingTimeSum = 0;
      let availableTimeSum = 0;
      times.forEach((time) => {
        workingTimeSum += time.workingTime;
        availableTimeSum += time.availableTime;
      });
      setWorkingTimeGlz(TimeUtils.minutesToTime(workingTimeSum));
      setAvailableTimeGlz(TimeUtils.minutesToTime(availableTimeSum));
    }
  }, [times]);

  /* 
  load all times from Firestore DB, either the select month,
  or the current month, if nothing selected yet.
  */
  useEffect(() => {
    if (days.length > 0) {
      getTimes(days[0].unix(), days[days.length - 1].unix()).then((res) => {
        setTimes(res);
      });
    } else {
      getTimes(dayjs().startOf('month').unix(), dayjs().endOf('month').unix()).then((res) => {
        setTimes(res);
      });
    }
  }, []);

  return (
    <>
      <MainContainer>
        <Stack spacing={2}>
          <MonthPicker onChange={handleDateRangePicker} />
          {workingTimeGlz && availableTimeGlz && (
            <Paper elevation={0}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">GLZ Saldo</Typography>
                <Typography variant="subtitle1">{workingTimeGlz} h</Typography>
                <Typography variant="body2">(Arbeitszeit)</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">GLZ Saldo</Typography>
                <Typography variant="subtitle1">{availableTimeGlz} h</Typography>
                <Typography variant="body2">(Verfügungszeit)</Typography>
              </Stack>
            </Paper>
          )}
          {days && days.map((day) => <ViewDate key={day.toISOString()} day={day} />)}
        </Stack>
      </MainContainer>
    </>
  );
};

export default TimeHistoryPage;
