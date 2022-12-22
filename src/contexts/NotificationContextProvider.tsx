import { AlertColor } from '@mui/material';
import { useState, useCallback, ReactNode, FC, createContext } from 'react';
import { INotificationContext, INotification } from '../interfaces/Types';

type Props = { children: ReactNode };

export const NotificationContext = createContext<INotificationContext>({
  notification: null,
  addNotification: () => {},
  removeNotification: () => {},
});

export const NotificationContextProvider: FC<Props> = ({ children }: Props) => {
  const [notification, setNotification] = useState<INotification | null>(null);

  const removeNotification = () => {
    setNotification(null);
  };

  const addNotification = (message: string, severity: AlertColor) => {
    setNotification({ message, severity });
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        addNotification: useCallback((message: string, severity: AlertColor) => addNotification(message, severity), []),
        removeNotification: useCallback(() => removeNotification(), []),
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
