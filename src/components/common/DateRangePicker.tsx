/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs';
import locale from 'dayjs/locale/de';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers/';
import 'dayjs/locale/de';

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

  /*
   Based on user interactions, the state is updated, representing the range a user has selected.
   It is always rounded to the full day.
  */
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

  /*
  If the Date Range list changes, the changes are passed to the parent component.
  */
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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'de'}>
          <DatePicker
            label="Von"
            value={from}
            onChange={(newValue) => {
              setFrom(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'de'}>
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
