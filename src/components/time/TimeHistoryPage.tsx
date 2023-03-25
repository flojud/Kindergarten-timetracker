import { useContext, useEffect, useState } from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import MonthPicker from '../common/MonthPicker';
import MainContainer from '../common/MainContainer';
import ViewDate from './TimeHistoryCard';
import useStore from '../../hooks/useStore';
import { IProfile, ITime, ITimeCsv } from '../../interfaces/Types';
import TimeUtils from '../../utils/TimeUtils';
import { ReactComponent as TimesSvg } from '../../svg/times.svg';
import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { exportPdf } from '../../utils/PDFExport';

const TimeHistoryPage = () => {
  const { getTimes, getAbsences } = useStore();
  const [days, setDays] = useState<Dayjs[]>([]);
  const [times, setTimes] = useState<ITime[] | null>(null);
  const [workingTimeGlz, setWorkingTimeGlz] = useState<string | null>(null);
  const [availableTimeGlz, setAvailableTimeGlz] = useState<string | null>(null);

  const handleDateRangePicker = (dates: Dayjs[]) => {
    setDays(dates);
  };

  const authContext = useContext(AuthContext);
  const profile = authContext!.profile as IProfile;
  const [timesExport, setTimesExport] = useState<ITimeCsv[] | null>(null);
  const prepareExportData = () => {
    if (times) {
      const data: ITimeCsv[] = [];
      times.forEach((time) => {
        let workingTimeBalance = 0;
        let availableTimeBalance = 0;
        if (time.workday) {
          workingTimeBalance = time.workingTime - profile.workingtime;
          availableTimeBalance = time.availableTime - profile.availabletime;
        } else {
          workingTimeBalance = time.workingTime;
          availableTimeBalance = time.availableTime;
        }

        data.push({
          week: TimeUtils.dateStringToWeek(time.day),
          day: time.day,
          workingTime: time.workingTime,
          workingTimeBalance: workingTimeBalance,
          availableTime: time.availableTime,
          availableTimeBalance: availableTimeBalance,
          notes: time.notes,
        });
      });
      setTimesExport(data);
    }
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
      prepareExportData();
    }
  }, [times]);

  /* 
  load all times from Firestore DB, either the select month,
  or the current month, if nothing selected yet.
  */
  useEffect(() => {
    let from;
    let to;

    if (days.length > 0) {
      from = days[0].unix();
      to = days[days.length - 1].unix();
    } else {
      from = dayjs().startOf('month').unix();
      to = dayjs().endOf('month').unix();
    }

    getTimes(from, to).then((res) => {
      setTimes(res);
    });
  }, [days]);

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
          {timesExport && (
            <Button variant="contained" endIcon={<DownloadIcon />} onClick={() => exportPdf(timesExport)}>
              Download
            </Button>
          )}
        </Stack>
      </MainContainer>
    </>
  );
};

export default TimeHistoryPage;
