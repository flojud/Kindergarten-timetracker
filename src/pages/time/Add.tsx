import MainContainer from '../../components/MainContainer';
import DateRangePicker from '../../components/DateRangePicker';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import AddDate from '../../components/AddDate';
import { Button, Grid, Stack } from '@mui/material';
import Item from '../../components/Item';

const Add = () => {
  const [days, setDays] = useState<Dayjs[]>([]);

  const handleDateRangePicker = (dateRange: Dayjs[]) => {
    setDays(dateRange);
  };

  const save = () => {
    console.log('speichern');
  };

  return (
    <>
      <MainContainer>
        <Stack spacing={2}>
          <DateRangePicker onChange={handleDateRangePicker} />
          {days.map((day) => (
            <AddDate key={day.toISOString()} day={day} />
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
