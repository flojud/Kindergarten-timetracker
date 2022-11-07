import React, { useContext, useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContextProvider';
import { IProfile } from '../interfaces/Profile';
import TimeUtils from '../utils/TimeUtils';
import HolidayUtils from '../utils/HolidayUtils';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { ITime } from '../interfaces/Data';

interface AddDateProps {
  day: Dayjs;
  onChange: (time: ITime) => void;
}
const AddDate = ({ day, onChange }: AddDateProps) => {
  const authContext = useContext(AuthContext);
  const profile = authContext!.profile as IProfile;

  const [workingTime, setWorkingTime] = useState<string>('');
  const [availableTime, setAvailableTime] = useState<string>('');
  const [availableTimeNote, setAvailableTimeNote] = useState<string>('');
  const [isWorkday, setIsWorkday] = useState<boolean>(true);

  useEffect(() => {
    if (HolidayUtils.checkIsWorkday(profile.workingdays, day, profile.state)) {
      setIsWorkday(true);
      setWorkingTime(TimeUtils.minutesToTime(profile.workingtime));
      setAvailableTime(TimeUtils.minutesToTime(profile.availabletime));
    } else {
      setIsWorkday(false);
      setWorkingTime('00:00');
      setAvailableTime('00:00');
    }
  }, []);

  useEffect(() => {
    const time: ITime = {} as ITime;
    time.day = day.format('YYYY-MM-DD');
    time.workingTime = TimeUtils.minutesFromTime(workingTime);
    time.availableTime = TimeUtils.minutesFromTime(availableTime);
    time.notes = availableTimeNote;
    if (time.workingTime > 0 || time.availableTime > 0 || time.notes.length > 0) {
      onChange(time);
    }
  }, [workingTime, availableTime, availableTimeNote]);

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Stack spacing={2} direction="row">
              <Typography variant="subtitle1">{day.format('dddd, D. MMMM')}</Typography>
              {!isWorkday && (
                <>
                  <BeachAccessIcon color="secondary" />
                  <Typography variant="subtitle1" color="text.secondary">
                    Kein Arbeitstag
                  </Typography>
                </>
              )}
            </Stack>

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
