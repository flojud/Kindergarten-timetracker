import { useContext } from 'react';
import { db } from '../firebase/Firebase';
import { collection, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { NotificationContext } from '../contexts/NotificationContextProvider';
import { AuthContext } from '../contexts/AuthContextProvider';
import { User } from 'firebase/auth';
import { ITime } from '../interfaces/Types';
import TimeUtils from '../utils/TimeUtils';

function useStore() {
  const notifyContext = useContext(NotificationContext);
  const authContext = useContext(AuthContext);
  const user = authContext!.user as User;

  const getTimes = async (from: number, to: number) => {
    const result: ITime[] = [];

    const ref = collection(db, user.uid);
    const q = query(ref, where('timestamp', '>', from), where('timestamp', '<', to));
    const response = await getDocs(q);
    if (response.docs !== undefined) {
      response.docs.forEach((item) => {
        result.push(item.data() as ITime);
      });
    }

    return result;
  };

  const saveTimes = (times: ITime[]) => {
    const batch = writeBatch(db);
    times.forEach((time) => {
      batch.set(doc(db, `${user.uid}/${time.day}`), {
        day: time.day,
        workingTime: time.workingTime,
        availableTime: time.availableTime,
        notes: time.notes,
        timestamp: TimeUtils.dateStringToTimestamp(time.day),
        workday: time.workday,
      });
    });

    batch
      .commit()
      .then(() => {
        notifyContext.addNotification('Erfoglreich gespeichert', 'success');
      })
      .catch((error) => {
        console.log(error);
        notifyContext.addNotification('Fehler beim Speichern', 'error');
      });
  };

  return { saveTimes, getTimes };
}

export default useStore;
