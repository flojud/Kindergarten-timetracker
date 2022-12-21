import { useEffect, useState } from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import MonthPicker from '../common/MonthPicker';
import MainContainer from '../common/MainContainer';
import ViewDate from './TimeHistoryCard';
import useStore from '../../hooks/useStore';
import { ITime } from '../../interfaces/Types';
import TimeUtils from '../../utils/TimeUtils';
import { ReactComponent as TimesSvg } from '../../svg/times.svg';
import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';

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
  Simply sumup all working and available times reveived
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
  }, [days]);

  const headers = [
    { label: 'Datum', key: 'day' },
    { label: 'Arbeitszeit', key: 'workingTime' },
    { label: 'Verfügungszeit', key: 'availableTime' },
    { label: 'Notizen', key: 'notes' },
    { label: 'Zeitstempel', key: 'timestamp' },
    { label: 'Arbeitstag', key: 'workday' },
  ];
  const handleDownload = () => {};

  return (
    <>
      <MainContainer>
        <Stack direction="column" alignItems="center" spacing={2}>
          <TimesSvg width="150px" height="150px" />
          <MonthPicker onChange={handleDateRangePicker} />
          {workingTimeGlz && availableTimeGlz && (
            <Paper elevation={1} sx={{ p: 2, width: '100%' }}>
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
          {times && (
            <Button variant="contained" endIcon={<DownloadIcon />}>
              <CSVLink data={times} headers={headers} filename={'Arbeitszeiten.csv'} style={{ textDecoration: 'none', color: 'inherit' }}>
                Download
              </CSVLink>
            </Button>
          )}
        </Stack>
      </MainContainer>
    </>
  );
};

export default TimeHistoryPage;
