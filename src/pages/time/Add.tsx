import MainContainer from '../../components/MainContainer';
import DateRangePicker from '../../components/DateRangePicker';
import { useContext, useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import locale from 'dayjs/locale/de';
import AddDate from '../../components/AddDate';
import { Button, Stack } from '@mui/material';
import { ITime } from '../../interfaces/Data';

import { db } from '../../firebase/Firebase';
import { doc, writeBatch } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { AuthContext } from '../../contexts/AuthContextProvider';
import useNotification from '../../hooks/useNotification';

const Add = () => {
  const authContext = useContext(AuthContext);
  const user = authContext!.user as User;

  const { notifyContext } = useNotification();

  const [days, setDays] = useState<Dayjs[]>([]);
  const [times, setTimes] = useState<ITime[]>([]);

  const handleDateRangePicker = (dateRange: Dayjs[]) => {
    setDays(dateRange);
  };

  /*
  We react to all changes in the Date Range Picker and have to remove existing elements from the state
  if the time period is reduced, or add the new elements to the state list if the time period is increased.
  */
  useEffect(() => {
    let tmpTimes: ITime[] = [];
    console.log(times);
    days.map((day) => {
      const t = times.filter((t) => t.day == day.locale({ ...locale }).format('YYYY-MM-DD'));
      if (t.length > 0) tmpTimes = tmpTimes.concat(t);
    });
    console.log(tmpTimes);
    setTimes(tmpTimes);
  }, [days]);

  /*
  Each Time object in the list is added to a Firestore Batch Set Call.
  At the end only one batch is sent and its success or failure is reported.
  */
  const save = () => {
    const batch = writeBatch(db);
    console.log(times);
    times.map((time) => {
      batch.set(doc(db, `${user.uid}/${time.day}`), {
        day: time.day,
        workingTime: time.workingTime,
        availableTime: time.availableTime,
        notes: time.notes,
      });
    });

    console.log(batch);
    batch
      .commit()
      .then(() => {
        notifyContext.addNotification('Arbeitszeiten erfoglreich gespeichert', 'success');
      })
      .catch((error) => {
        console.log(error);
        notifyContext.addNotification('Fehler beim Speichern der Arbeitszeiten', 'error');
      })
      .finally(() => {
        // todo route to dashboard
      });
  };

  /*
  Each time a value is changed in one of the input fields for a single day,
  the old day object in the list must be updated, by first deleting and then setting the new one.
  */
  const handleAddDate = (time: ITime) => {
    const tmpTimes = times.filter((t) => t.day !== time.day);
    tmpTimes.push(time);
    setTimes(tmpTimes);
  };

  useEffect(() => {
    console.log(times);
  }, [times]);

  return (
    <>
      <MainContainer>
        <Stack spacing={2}>
          <DateRangePicker onChange={handleDateRangePicker} />
          {days.map((day) => (
            <AddDate key={day.toISOString()} day={day} onChange={handleAddDate} />
          ))}
          <Button variant="contained" onClick={save}>
            Speichern
          </Button>
        </Stack>
      </MainContainer>
    </>
  );
};

export default Add;
