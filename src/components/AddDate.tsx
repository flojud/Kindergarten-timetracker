import React, { useState } from 'react';
import { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs';
import { Card, CardContent, CardHeader, Paper, Stack, TextField } from '@mui/material';

interface AddDateProps {
  day: Dayjs;
}
const AddDate = ({ day }: AddDateProps) => {
  const [workingTime, setWorkingTime] = useState<number>(8);
  const [availableTime, setAvailableTime] = useState<number>(0);
  const [availableTimeNote, setAvailableTimeNote] = useState<string | null>(null);

  return (
    <>
      <Card sx={{}}>
        <CardHeader title={day.format('dddd, D. MMMM')} />
        <CardContent>
          <Stack spacing={2}>
            <Stack spacing={2} direction="row">
              <TextField
                type="time"
                label="Arbeitszeit am Kind"
                value={workingTime}
                onChange={(e) => setWorkingTime(e.target.value as unknown as number)}
                sx={{ width: '100%' }}
                helperText={`Wieviel Stunden hast du am ${day.format('dddd')} am Kind gearbeitet?`}
              />
              <TextField
                type="time"
                label="Verfügungszeit"
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value as unknown as number)}
                sx={{ width: '100%' }}
                helperText={`Wieviel Verfügungszeit hast du am ${day.format('dddd')} genutzt?`}
              />
            </Stack>
            <Stack spacing={2} direction="row">
              <TextField
                type="text"
                label="Notiz zur Verfügungszeit"
                value={availableTimeNote}
                onChange={(e) => setAvailableTimeNote(e.target.value)}
                sx={{ width: '100%' }}
                helperText="Optional: Schreibe eine kleine Notiz zu Art der Tätigkeit"
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default AddDate;
