/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import TimeUtils from '../../utils/TimeUtils';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { IProfile, ITime } from '../../interfaces/Types';
import locale from 'dayjs/locale/de';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import HolidayUtils from '../../utils/HolidayUtils';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { ReactComponent as EditSvg } from '../../svg/edit.svg';

const TimeEditPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const profile = authContext!.profile as IProfile;

  const { day } = useParams();
  const { getTime, saveTimes, deleteTime } = useStore();

  const [workingTime, setWorkingTime] = useState<string>('');
  const [availableTime, setAvailableTime] = useState<string>('');
  const [availableTimeNote, setAvailableTimeNote] = useState<string>('');
  const [workday, setWorkday] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [time, setTime] = useState<ITime | null>(null);

  /*
  Based on the user's working days, which he has set in the profile and the
  federal state and the associated public holidays, we decide whether it is a working day.
  Since it is theoretically possible to work on non-working days, we only display an information symbol in the input mask.
  */
  useEffect(() => {
    setTitle(() => {
      return dayjs(day)
        .locale({
          ...locale,
        })
        .format('dddd, DD.MMMM');
    });

    getTime(
      dayjs(day)
        .locale({
          ...locale,
        })
        .unix()
    )
      .then((res) => {
        if (res) {
          setWorkingTime(TimeUtils.minutesToTime(res.workingTime));
          setAvailableTime(TimeUtils.minutesToTime(res.availableTime));
          setAvailableTimeNote(res.notes);
        } else {
          setWorkingTime(TimeUtils.minutesToTime(profile.workingtime));
          setAvailableTime(TimeUtils.minutesToTime(profile.availabletime));
        }
      })
      .finally(() => {
        const isWorkday = HolidayUtils.checkIsWorkday(
          profile.workingdays,
          dayjs(day).locale({
            ...locale,
          }),
          profile.state
        );

        setWorkday(isWorkday);
      });
  }, []);

  /*
  We react to all user entries in the input fields and compile an updated time object at any point in time.
  */
  useEffect(() => {
    setTime({
      day: dayjs(day)
        .locale({ ...locale })
        .format('YYYY-MM-DD'),
      workingTime: TimeUtils.minutesFromTime(workingTime),
      availableTime: TimeUtils.minutesFromTime(availableTime),
      notes: availableTimeNote,
      workday: workday,
    } as ITime);
  }, [workingTime, availableTime, availableTimeNote]);

  const save = () => {
    if (time) {
      saveTimes([time]);
      navigate('/time/view');
    }
  };

  const deleteThisItem = () => {
    if (time)
      deleteTime(
        dayjs(day)
          .locale({ ...locale })
          .format('YYYY-MM-DD')
      );
    navigate('/time/view');
  };

  return (
    <>
      <Stack direction="column" alignItems="center" spacing={2} height={'80vh'}>
        <EditSvg width="150px" height="150px" />
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Stack spacing={2} direction="row" alignItems={'center'}>
                <Typography variant="subtitle1">{title}</Typography>
                {!workday && (
                  <>
                    <BeachAccessIcon color="secondary" />
                    <Typography variant="caption" color="text.secondary">
                      Kein Arbeitstag
                    </Typography>
                  </>
                )}
              </Stack>

              <Stack spacing={2} direction="row">
                <TextField
                  type="time"
                  label="Arbeitszeit"
                  value={workingTime}
                  onChange={(e) => setWorkingTime(e.target.value)}
                  sx={{ width: '100%' }}
                  //helperText={`Wieviel Stunden hast du am ${day.format('dddd')} am Kind gearbeitet?`}
                />
                <TextField
                  type="time"
                  label="Verfügungszeit"
                  value={availableTime}
                  onChange={(e) => setAvailableTime(e.target.value)}
                  sx={{ width: '100%' }}
                  //helperText={`Wieviel Verfügungszeit hast du am ${day.format('dddd')} genutzt?`}
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <TextField
                  type="text"
                  label="Notiz zur Verfügungszeit"
                  value={availableTimeNote}
                  onChange={(e) => setAvailableTimeNote(e.target.value)}
                  sx={{ width: '100%' }}
                  //helperText="Optional: Schreibe eine kleine Notiz zu Art der Tätigkeit"
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
        <Button variant="contained" onClick={save} color="secondary">
          <Typography variant="button" display="block" color={'text.primary'}>
            Speichern
          </Typography>
        </Button>
        <Button variant="contained" onClick={deleteThisItem} color="primary">
          <Typography variant="button" display="block" color={'text.primary'}>
            Löschen
          </Typography>
        </Button>
      </Stack>
    </>
  );
};

export default TimeEditPage;
