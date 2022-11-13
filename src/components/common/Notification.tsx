import { Alert, Snackbar } from '@mui/material';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { NotificationContext } from '../../contexts/NotificationContextProvider';

const Notification = () => {
  //const { notifyContext } = useNotification();
  const notifyContext = useContext(NotificationContext);
  const [open, setOpen] = useState(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  useEffect(() => {
    if (notifyContext.notification && notifyContext.notification.message) {
      setOpen(true);
    }
  }, [notifyContext]);

  return (
    <>
      {notifyContext.notification && notifyContext.notification.severity && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={notifyContext.notification.severity} sx={{ width: '100%' }}>
            {notifyContext.notification.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Notification;
