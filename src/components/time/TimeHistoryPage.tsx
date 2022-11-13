import React, { useContext, useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import MonthPicker from '../common/MonthPicker';
import MainContainer from '../common/MainContainer';
import ViewDate from './TimeHistoryCard';

const TimeHistoryPage = () => {
  const [days, setDays] = useState<Dayjs[]>([]);

  const handleDateRangePicker = (dates: Dayjs[]) => {
    setDays(dates);
  };

  return (
    <>
      <MainContainer>
        <Stack spacing={2}>
          <MonthPicker onChange={handleDateRangePicker} />
          {days && days.map((day) => <ViewDate key={day.toISOString()} day={day} />)}
        </Stack>
      </MainContainer>
    </>
  );
};

export default TimeHistoryPage;
