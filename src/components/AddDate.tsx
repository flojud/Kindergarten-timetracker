import React, { useContext, useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { Card, CardContent, CardHeader, Stack, TextField, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContextProvider';
import { IProfile } from '../interfaces/Profile';
import TimeUtils from '../utils/TimeUtils';
import HolidayUtils from '../utils/HolidayUtils';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

interface AddDateProps {
  day: Dayjs;
}
const AddDate = ({ day }: AddDateProps) => {
  const authContext = useContext(AuthContext);
  const profile = authContext!.profile as IProfile;

  const [workingTime, setWorkingTime] = useState<string>('');
  const [availableTime, setAvailableTime] = useState<string>('');
  const [availableTimeNote, setAvailableTimeNote] = useState<string>('');

  const [isWorkday, setIsWorkday] = useState<boolean>(true);
  const checkIsWorkday = () => {
    const workday = TimeUtils.checkWorkday(day, profile.workingdays);
    const holiday = HolidayUtils.isHoliday(day, profile.state);
    if (holiday) return false;
    if (workday) return true;
    return false;
  };

  useEffect(() => {
    setWorkingTime(TimeUtils.minutesToTime(profile.workingtime));
    setAvailableTime(TimeUtils.minutesToTime(profile.availabletime));
    setIsWorkday(checkIsWorkday());
  }, []);

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
