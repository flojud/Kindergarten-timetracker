import { Divider, Typography } from '@mui/material';

const UserHomePage = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Willkommen zuück, Lucy! Wir haben dich vermisst. 👋
      </Typography>
      <Divider />
    </>
  );
};

export default UserHomePage;
