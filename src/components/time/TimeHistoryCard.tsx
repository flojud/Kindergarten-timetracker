import { Card, CardContent, Stack, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import useStore from '../../hooks/useStore';
import { IProfile } from '../../interfaces/Types';
import locale from 'dayjs/locale/de';
import TimeUtils from '../../utils/TimeUtils';
import HolidayUtils from '../../utils/HolidayUtils';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { Link } from 'react-router-dom';

interface TimeHistoryCardProps {
  day: Dayjs;
}
const TimeHistoryCard = ({ day }: TimeHistoryCardProps) => {
  const authContext = useContext(AuthContext);
  const profile = authContext!.profile as IProfile;

  const { getTime } = useStore();
  const [workingTime, setWorkingTime] = useState<string | null>(null);
  const [availableTime, setAvailableTime] = useState<string | null>(null);
  const [workday, setWorkday] = useState<boolean | null>(null);

  const title = dayjs(day)
    .locale({ ...locale })
    .format('dd DD.MM.');

  /*
    fetches working and available time from Firestore DB
    and checks if the day is working or not.
  */
  useEffect(() => {
    getTime(day.unix())
      .then((res) => {
        if (res) {
          setWorkingTime(TimeUtils.minutesToTime(res.workingTime));
          setAvailableTime(TimeUtils.minutesToTime(res.availableTime));
          setCardBgColor('');
        }
      })
      .finally(() => {
        const isWorkday = HolidayUtils.checkIsWorkday(profile.workingdays, day.locale({ ...locale }), profile.state);
        if (isWorkday == false) setCardBgColor('#C7C7C7');
        setWorkday(isWorkday);
      });
  }, []);

  /*
    Calculate absenteeism if it is a working day but no time
    was found in the database and the date is in the past.
  */
  const [absenteeism, setAbsenteeism] = useState<boolean>(false);
  const [cardBgColor, setCardBgColor] = useState<string>('');
  useEffect(() => {
    if (workday == true && day.isBefore(dayjs(), 'day') && workingTime == null) {
      setAbsenteeism(true);
      setCardBgColor('primary.main');
    }
  }, [workday, workingTime]);

  return (
    <>
      <Card
        sx={{ bgcolor: `${cardBgColor}`, width: '100%' }}
        component={Link}
        to={`/time/edit/${day.locale({ ...locale }).format('YYYY-MM-DD')}`}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="subtitle1">{title}</Typography>
            {absenteeism && <Typography variant="body2">Fehlzeit</Typography>}

            {workingTime && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2">VZ</Typography>
                  <Typography variant="body1" display="block" gutterBottom>
                    {availableTime} h
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2">AZ</Typography>
                  <Typography variant="body1" display="block" gutterBottom>
                    {workingTime} h
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default TimeHistoryCard;
