import { Divider, Grid, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'dayjs/locale/de';
import { IAbsence, IProfile } from '../interfaces/Types';
import useStore from '../hooks/useStore';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import SickOutlinedIcon from '@mui/icons-material/SickOutlined';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import UserHomePageInfoCard from './UserHomePageInfoCard';
import { ReactComponent as HomeSvg } from '../svg/home.svg';

const UserHomePage = () => {
  const authContext = useContext(AuthContext);
  const profile = authContext!.profile as IProfile;
  const { getHolidays } = useStore();
  const [noHolidays, setNoHolidays] = useState<number>(0);

  useEffect(() => {
    calculateLeftHolidays();
  }, [profile]);

  const calculateLeftHolidays = () => {
    const from = dayjs()
      .locale({ ...locale })
      .startOf('year');

    const to = dayjs()
      .locale({ ...locale })
      .endOf('year');

    getHolidays(from.unix(), to.unix()).then((absences: IAbsence[]) => {
      if (profile)
        if (absences) {
          setNoHolidays(profile.holidays - absences.length);
        } else {
          setNoHolidays(profile.holidays);
        }
    });
  };

  return (
    <>
      <Stack direction="column" alignItems="center" spacing={0}>
        <HomeSvg width="150px" height="150px" />

        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Willkommen zuück, {authContext?.user?.displayName}! Wir haben dich vermisst. 👋
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid direction="row" justifyContent="center" alignItems="center" gap={4} container>
          <UserHomePageInfoCard
            title={'Freie Urlaubstage'}
            value={`${noHolidays} Tg.`}
            subtitle={'In diesem Jahr'}
            SvgIcon={AirplanemodeActiveIcon}
          />
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
      </Stack>
    </>
  );
};

export default UserHomePage;
