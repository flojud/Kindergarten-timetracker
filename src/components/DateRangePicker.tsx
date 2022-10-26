import React, { FC, useEffect } from 'react';
import { Box } from '@mui/material';

import { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs';
import locale from 'dayjs/locale/de';
import weekday from 'dayjs/plugin/weekday';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IDateRange } from '../interfaces/Data';

interface DateRangePickerProps {
  onChange: (dateRange: IDateRange) => void;
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
  const [days, setDays] = React.useState<number | null>(0);

  useEffect(() => {
    if (to !== null && from !== null) {
      setDays(Math.ceil(to.diff(from, 'day', true)));
      dateRangePickerChange();
    }
  }, [from, to]);

  const dateRangePickerChange = () => {
    onChange({ from, to, days });
  };
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
      {days}
    </>
  );
};

export default DateRangePicker;
