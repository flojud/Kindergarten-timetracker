import { Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import SickOutlinedIcon from '@mui/icons-material/SickOutlined';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import UserHomePageInfoCard from './UserHomePageInfoCard';

const UserHomePage = () => {
  const authContext = useContext(AuthContext);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Willkommen zuück, {authContext?.user?.displayName}! Wir haben dich vermisst. 👋
      </Typography>
      <Divider sx={{ my: 4 }} />
      <Grid direction="row" justifyContent="flex-start" alignItems="flex-start" gap={4} container>
        <UserHomePageInfoCard title={'Freie Urlaubstage'} value={'7'} subtitle={'In diesem Jahr'} SvgIcon={AirplanemodeActiveIcon} />
        <UserHomePageInfoCard
          title={'Arbeitszeit am Kind Saldo'}
          value={'+ 28 h'}
          subtitle={'Seit Start der Erfassung'}
          SvgIcon={AccessTimeOutlinedIcon}
        />
        <UserHomePageInfoCard
          title={'Verfügungszeit Saldo'}
          value={'- 11 h'}
          subtitle={'Im aktuellen Monat'}
          SvgIcon={PsychologyAltOutlinedIcon}
        />
        <UserHomePageInfoCard title={'Krankheitstage'} value={'1 Tag'} subtitle={'In diesem Jahr'} SvgIcon={SickOutlinedIcon} />
      </Grid>
    </>
  );
};

export default UserHomePage;
