import { AlertColor } from '@mui/material';

export interface INotificationContext {
  notification: INotification | null;
  addNotification: (message: string, severity: AlertColor) => void;
  removeNotification: () => void;
}

export interface INotification {
  message: string | null;
  severity: AlertColor | null;
}
