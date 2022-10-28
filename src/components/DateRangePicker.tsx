/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { Box } from '@mui/material';

import { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs';
import locale from 'dayjs/locale/de';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DateRangePickerProps {
  onChange: (dateRange: Dayjs[]) => void;
}
const DateRangePicker: FC<DateRangePickerProps> = ({ onChange }: DateRangePickerProps) => {
  const startOfWeek = dayjs
    .default()
    .locale({
      ...locale,
    })
    .startOf('week');
  const today = dayjs.default().locale({
    ...locale,
  });
  const [from, setFrom] = React.useState<Dayjs | null>(startOfWeek);
  const [to, setTo] = React.useState<Dayjs | null>(today);
  const [days, setDays] = React.useState<Dayjs[]>([]);

  useEffect(() => {
    if (to && from) {
      setDays([]);
      const d = Math.ceil(to.diff(from, 'day', true));
      for (let i = 0; i < d; i++) {
        const nextDay = from.add(i, 'day');
        setDays((prevState) => [...prevState, nextDay]);
      }
    }
  }, [from, to]);

  useEffect(() => {
    onChange(days);
  }, [days]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Von"
            value={from}
            onChange={(newValue) => {
              setFrom(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Bis"
            value={to}
            onChange={(newValue) => {
              setTo(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </>
  );
};

export default DateRangePicker;
