import { Card, CardContent, Stack, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'dayjs/locale/de';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import useStore from '../../hooks/useStore';
import { IAbsence, IProfile } from '../../interfaces/Types';
import HolidayUtils from '../../utils/HolidayUtils';
import TimeUtils from '../../utils/TimeUtils';

interface TimeHistoryCardProps {
  day: Dayjs;
}
const TimeHistoryCard = ({ day }: TimeHistoryCardProps) => {
  const authContext = useContext(AuthContext);
  const profile = authContext!.profile as IProfile;

  const { getTime, getAbsence } = useStore();
  const [workingTime, setWorkingTime] = useState<string | null>(null);
  const [availableTime, setAvailableTime] = useState<string | null>(null);
  const [workday, setWorkday] = useState<boolean | null>(null);
  const [absence, setAbsence] = useState<IAbsence | null>(null);

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

    getAbsence(day.unix()).then((res) => {
      if (res) {
        setAbsence(res);
        setCardBgColor(HolidayUtils.absenceCalendarColor(res.absencetype));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
    Calculate absenteeism if it is a working day but no time
    was found in the database and the date is in the past.
  */
  const [absenteeism, setAbsenteeism] = useState<boolean>(false);
  const [cardBgColor, setCardBgColor] = useState<string>('');
  useEffect(() => {
    if (workday == true && day.isBefore(dayjs(), 'day') && workingTime == null && absence == null) {
      setAbsenteeism(true);
      setCardBgColor('primary.main');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workday, workingTime, absence]);

  return (
    <>
      <Card
        sx={{ bgcolor: `${cardBgColor}`, width: '100%' }}
        component={Link}
        to={`/time/edit/${day.locale({ ...locale }).format('YYYY-MM-DD')}`}
        style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="subtitle1">{title}</Typography>
            {absenteeism && <Typography variant="body2">Fehlzeit</Typography>}

            {absence && <Typography variant="body2">{absence.absencetype}</Typography>}

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
