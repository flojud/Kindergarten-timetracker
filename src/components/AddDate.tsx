import React, { useContext, useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import { AuthContext } from '../contexts/AuthContextProvider';
import { IProfile } from '../interfaces/Profile';
import TimeUtils from '../utils/TimeUtils';

interface AddDateProps {
  day: Dayjs;
}
const AddDate = ({ day }: AddDateProps) => {
  const authContext = useContext(AuthContext);
  const profile = authContext!.profile as IProfile;

  const [workingTime, setWorkingTime] = useState<string | null>(null);
  const [availableTime, setAvailableTime] = useState<string | null>(null);
  const [availableTimeNote, setAvailableTimeNote] = useState<string | null>(null);

  const [isWorkday, setIsWorkday] = useState<boolean>(true);

  useEffect(() => {
    setWorkingTime(TimeUtils.minutesToTime(profile.workingtime));
    setAvailableTime(TimeUtils.minutesToTime(profile.availabletime));
    setIsWorkday(TimeUtils.checkWorkday(day, profile.workingdays));
  }, []);

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
                onChange={(e) => setWorkingTime(e.target.value)}
                sx={{ width: '100%' }}
                helperText={`Wieviel Stunden hast du am ${day.format('dddd')} am Kind gearbeitet?`}
              />
              <TextField
                type="time"
                label="Verfügungszeit"
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
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
