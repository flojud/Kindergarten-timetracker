import dayjs, { Dayjs } from 'dayjs';
import { User } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, limit, orderBy, query, where, writeBatch } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';
import { NotificationContext } from '../contexts/NotificationContextProvider';
import { db } from '../firebase/Firebase';
import { IAbsence, ITime } from '../interfaces/Types';
import TimeUtils from '../utils/TimeUtils';

function useStore() {
  const notifyContext = useContext(NotificationContext);
  const authContext = useContext(AuthContext);
  const user = authContext!.user as User;

  const firstTimeDate = async () => {
    let result: Dayjs = dayjs();
    const ref = collection(db, user.uid);
    const q = query(ref, orderBy('timestamp', 'asc'), limit(1));
    const response = await getDocs(q);

    if (response.docs !== undefined) {
      const fistTime = response.docs[0].data() as ITime;
      result = dayjs(fistTime.day);
    }
    return result;
  };

  const getTime = async (timestamp: number) => {
    const ref = collection(db, user.uid);
    const q = query(ref, where('timestamp', '==', timestamp));
    const response = await getDocs(q);
    if (response.docs !== undefined) {
      if (response.docs.length == 1) {
        return response.docs[0].data() as ITime;
      }
    }

    return null;
  };

  const deleteTime = async (day: string) => {
    deleteDoc(doc(db, `${user.uid}/${day}`))
      .then(() => {
        notifyContext.addNotification('Erfoglreich gelöscht', 'success');
      })
      .catch((error) => {
        console.log(error);
        notifyContext.addNotification('Fehler beim Löschen', 'error');
      });
  };

  const getTimes = async (from: number, to: number) => {
    const result: ITime[] = [];

    const ref = collection(db, user.uid);
    const q = query(ref, where('timestamp', '>=', from), where('timestamp', '<=', to));
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

  const getAbsence = async (timestamp: number) => {
    const ref = collection(db, `absences-${user.uid}`);
    const q = query(ref, where('timestamp', '==', timestamp));
    const response = await getDocs(q);
    if (response.docs !== undefined) {
      if (response.docs.length == 1) {
        return response.docs[0].data() as IAbsence;
      }
    }

    return null;
  };

  const getHolidays = async (from: number, to: number) => {
    const result: IAbsence[] = [];

    const ref = collection(db, `absences-${user.uid}`);
    const q = query(
      ref,
      where('timestamp', '>=', from),
      where('timestamp', '<=', to),
      where('absencetype', 'in', ['Urlaub', 'Schließtag'])
    );
    const response = await getDocs(q);
    if (response.docs !== undefined) {
      response.docs.forEach((item) => {
        result.push(item.data() as IAbsence);
      });
    }

    return result;
  };

  const getSickDays = async (from: number, to: number) => {
    const result: IAbsence[] = [];

    const ref = collection(db, `absences-${user.uid}`);
    const q = query(ref, where('timestamp', '>=', from), where('timestamp', '<=', to), where('absencetype', '==', 'Krankheit'));
    const response = await getDocs(q);
    if (response.docs !== undefined) {
      response.docs.forEach((item) => {
        result.push(item.data() as IAbsence);
      });
    }

    return result;
  };

  const getAbsences = async (from: number, to: number) => {
    const result: IAbsence[] = [];

    const ref = collection(db, `absences-${user.uid}`);
    const q = query(ref, where('timestamp', '>=', from), where('timestamp', '<=', to));
    const response = await getDocs(q);
    if (response.docs !== undefined) {
      response.docs.forEach((item) => {
        result.push(item.data() as IAbsence);
      });
    }

    return result;
  };

  const deleteAbsence = async (absence: IAbsence) => {
    deleteDoc(doc(db, `absences-${user.uid}/${absence.day}`))
      .then(() => {
        notifyContext.addNotification('Erfoglreich gelöscht', 'success');
      })
      .catch((error) => {
        console.log(error);
        notifyContext.addNotification('Fehler beim Löschen', 'error');
      });
  };

  const saveAbsence = (absences: IAbsence[]) => {
    const batch = writeBatch(db);
    absences.forEach((absence) => {
      batch.set(doc(db, `absences-${user.uid}/${absence.day}`), {
        day: absence.day,
        timestamp: TimeUtils.dateStringToTimestamp(absence.day),
        absencetype: absence.absencetype,
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

  return {
    saveTimes,
    getTime,
    getTimes,
    firstTimeDate,
    getAbsence,
    getAbsences,
    deleteAbsence,
    saveAbsence,
    getHolidays,
    getSickDays,
    deleteTime,
  };
}

export default useStore;
