import MainContainer from '../../components/MainContainer';
import DateRangePicker from '../../components/DateRangePicker';
import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import AddDate from '../../components/AddDate';
import { Button, Stack } from '@mui/material';
import { ITime } from '../../interfaces/Data';

const Add = () => {
  const [days, setDays] = useState<Dayjs[]>([]);
  const [times, setTimes] = useState<ITime[]>([]);

  const handleDateRangePicker = (dateRange: Dayjs[]) => {
    setDays(dateRange);
    const tmpTimes: ITime[] = [];
    console.log(dateRange);
    dateRange.map((day) => {
      const t = times.filter((t) => t.day == day.format('YYYY-MM-DD'));
      tmpTimes.concat(t);
    });
    console.log(tmpTimes);
    setTimes(tmpTimes);
  };

  const save = () => {
    console.log('speichern');
  };

  const timeHandler = (time: ITime) => {
    // delete the day of the list if exists
    const tmpTimes = times.filter((t) => t.day !== time.day);
    // push the update object to the list
    tmpTimes.push(time);
    setTimes(tmpTimes);
  };

  useEffect(() => {
    console.log(times);
  }, [times]);

  return (
    <>
      <MainContainer>
        <Stack spacing={2}>
          <DateRangePicker onChange={handleDateRangePicker} />
          {days.map((day) => (
            <AddDate key={day.toISOString()} day={day} onChange={timeHandler} />
          ))}
          <Button variant="contained" onClick={save}>
            Speichern
          </Button>
        </Stack>
      </MainContainer>
    </>
  );
};

export default Add;
