/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAddToHomescreenPrompt } from '../hooks/useAddToHomescreenPrompt';

const A2HSInstaller = () => {
  const [open, setOpen] = useState(false);
  const [prompt, promptToInstall, isInstalled] = useAddToHomescreenPrompt();

  useEffect(() => {
    if (prompt && !isInstalled) setOpen(true);
    if (isInstalled) setOpen(false);
  }, [prompt]);

  const installA2HS = () => {
    promptToInstall();
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            bottom: '0px',
            width: '100%',
            bgcolor: 'text.primary',
            p: 2,
          }}>
          <Typography variant="h3" color="white" gutterBottom>
            Kinderten Time Tracker
          </Typography>
          <Typography variant="body1" color="white" gutterBottom>
            Machen Sie es zu einem Teil Ihrer täglichen Routine – fügen Sie es Ihrem Homescreen hinzu und greifen Sie mit nur einem
            Fingertipp darauf zu!
          </Typography>
          <Button variant="contained" onClick={installA2HS} sx={{ mt: 2, mb: 2 }}>
            App installieren
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default A2HSInstaller;
