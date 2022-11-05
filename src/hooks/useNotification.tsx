import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContextProvider';

function useNotification() {
  const notifyContext = useContext(NotificationContext);
  return { notifyContext };
}

export default useNotification;
