/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Stack, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import locale from 'dayjs/locale/de';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import useStore from '../../hooks/useStore';
import { IProfile, ITime } from '../../interfaces/Types';
import { ReactComponent as TimeSvg } from '../../svg/time.svg';
import TimeUtils from '../../utils/TimeUtils';
import DateRangePicker from '../common/DateRangePicker';
import MainContainer from '../common/MainContainer';
import TimeInputCard from './TimeInputCard';

const TimeInputPage = () => {
  const authContext = useContext(AuthContext);
  const profile = authContext!.profile as IProfile;
  const { getTimes, saveTimes } = useStore();
  const [days, setDays] = useState<Dayjs[]>([]);
  const [times, setTimes] = useState<ITime[]>([]);
  const [storedData, setStoredData] = useState<ITime[]>([]);
  const [data, setData] = useState<ITime[]>([]);

  const handleDateRangePicker = (dateRange: Dayjs[]) => {
    setDays(dateRange);
  };

  /*
  Each Time object in the list is added to a Firestore Batch Set Call.
  At the end only one batch is sent and its success or failure is reported.
  */
  const save = () => {
    saveTimes(times);
  };

  /*
  Each time a value is changed in one of the input fields for a single day,
  the old day object in the list must be updated, by first deleting and then setting the new one.
  */
  const handleAddDate = (time: ITime) => {
    setTimes((prevTimes) => {
      const tmpTimes = prevTimes.filter((t) => t.day !== time.day);
      tmpTimes.push(time);
      return tmpTimes;
    });
  };

  /*
  We react to all changes in the Date Range Picker and have to remove existing elements from the state
  if the time period is reduced, or add the new elements to the state list if the time period is increased.
  */
  useEffect(() => {
    setTimes((prevTimes) => {
      let tmpTimes: ITime[] = [];
      days.forEach((day) => {
        const t = prevTimes.filter((t) => t.day == day.locale({ ...locale }).format('YYYY-MM-DD'));
        if (t.length > 0) tmpTimes = tmpTimes.concat(t);
      });
      return tmpTimes;
    });

    // Loads saved data from firestore DB
    if (days.length > 0) {
      const from = days[0].unix();
      const to = days[days.length - 1].unix();
      getTimes(from, to).then((result) => {
        setStoredData(result);
      });
    }
  }, [days]);

  /* 
  this useEffect start when a stored data is received and creates a list ITime object,
  days without stored data will be filled up with default values.
  */
  useEffect(() => {
    setData(() => {
      let tmpTimes: ITime[] = [];
      days.forEach((day) => {
        const res = storedData.filter((item) => {
          return item.day == day.locale({ ...locale }).format('YYYY-MM-DD');
        });
        if (res.length > 0) {
          tmpTimes = tmpTimes.concat(res);
        } else {
          tmpTimes.push(TimeUtils.defaultTime(day.locale({ ...locale }), profile));
        }
      });
      return tmpTimes;
    });
  }, [storedData]);

  return (
    <>
      <MainContainer>
        <Stack direction="column" alignItems="center" spacing={2}>
          <TimeSvg width="150px" height="150px" />
          <DateRangePicker onChange={handleDateRangePicker} />
          {data.map((item) => (
            <TimeInputCard key={item.day} data={item} onChange={handleAddDate} />
          ))}
          <Button variant="contained" onClick={save} color="secondary">
            <Typography variant="button" display="block" color="text.primary">
              Speichern
            </Typography>
          </Button>
        </Stack>
      </MainContainer>
    </>
  );
};

export default TimeInputPage;
