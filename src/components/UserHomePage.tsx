import { Divider, Grid, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'dayjs/locale/de';
import { IAbsence, IProfile, ITime } from '../interfaces/Types';
import useStore from '../hooks/useStore';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import SickOutlinedIcon from '@mui/icons-material/SickOutlined';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import UserHomePageInfoCard from './UserHomePageInfoCard';
import { ReactComponent as HomeSvg } from '../svg/home.svg';
import TimeUtils from '../utils/TimeUtils';

const UserHomePage = () => {
  const authContext = useContext(AuthContext);
  const profile = authContext!.profile as IProfile;
  const { getHolidays, getSickDays, getTimes, firstTimeDate } = useStore();

  const [noHolidays, setNoHolidays] = useState<number>(0);
  const [noSickDays, setNoSickDays] = useState<number>(0);

  const [workingTimeSum, setWorkingTimeSum] = useState<number>(0);
  const [balanceWorkMinutes, setBalanceWorkMinutes] = useState<number>(0);

  const [availableTimeSum, setAvailableTimeSum] = useState<number>(0);
  const [balanceAvailableMinutes, setBalanceAvailableMinutes] = useState<number>(0);

  const [from, setFrom] = useState<Dayjs | null>(null);
  const to = dayjs()
    .locale({ ...locale })
    .endOf('year');

  useEffect(() => {
    // in case you start tracking in the mid of the year
    firstTimeDate().then((firstTime: Dayjs) => {
      const firstJanuary = dayjs()
        .locale({ ...locale })
        .startOf('year');
      if (firstTime.isAfter(firstJanuary)) {
        console.log('first tracked time in DB ' + firstTime);
        setFrom(firstTime);
      } else {
        setFrom(firstJanuary);
      }
    });
  }, []);

  useEffect(() => {
    if (profile && from) {
      // calculate left Holidays for this year
      getHolidays(from.unix(), to.unix()).then((absences: IAbsence[]) => {
        if (absences) {
          setNoHolidays(profile.holidays - absences.length);
        } else {
          setNoHolidays(profile.holidays);
        }
      });

      // calculate sickness Days for this year
      getSickDays(from.unix(), to.unix()).then((sickDays: IAbsence[]) => {
        setNoSickDays(sickDays.length);
      });

      // get working time and available time for this year
      let wT = 0;
      let aT = 0;
      getTimes(from.unix(), to.unix()).then((times: ITime[]) => {
        console.log('received data ...');
        times.forEach((time) => {
          wT += time.workingTime;
          aT += time.availableTime;
        });
        setWorkingTimeSum(wT);
        setAvailableTimeSum(aT);
      });
    }
  }, [profile, from]);

  useEffect(() => {
    // calculate Saldo Work Time
    if (workingTimeSum && profile && from) {
      const days: Dayjs[] = [];
      const d = Math.ceil(to.diff(from, 'day', true));
      for (let i = 0; i < d; i++) {
        const nextDay = from.add(i, 'day');
        days.push(nextDay);
      }
      const targetWorkingMinutes = days.length * profile.workingtime;
      setBalanceWorkMinutes(workingTimeSum - targetWorkingMinutes);
    }
  }, [workingTimeSum]);

  useEffect(() => {
    console.log(availableTimeSum);
    // calculate Available Time
    if (availableTimeSum && profile && from) {
      const days: Dayjs[] = [];
      const d = Math.ceil(to.diff(from, 'day', true));
      for (let i = 0; i < d; i++) {
        const nextDay = from.add(i, 'day');
        days.push(nextDay);
      }
      const targetAvailableMinutes = days.length * profile.availabletime;
      setBalanceAvailableMinutes(availableTimeSum - targetAvailableMinutes);
    }
  }, [availableTimeSum]);

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
            value={`${TimeUtils.negativeMinutesToTime(balanceWorkMinutes)} h`}
            subtitle={'Seit Start der Erfassung'}
            SvgIcon={AccessTimeOutlinedIcon}
          />
          <UserHomePageInfoCard
            title={'Verfügungszeit Saldo'}
            value={`${TimeUtils.negativeMinutesToTime(balanceAvailableMinutes)} h`}
            subtitle={'Im aktuellen Monat'}
            SvgIcon={PsychologyAltOutlinedIcon}
          />
          <UserHomePageInfoCard
            title={'Krankheitstage'}
            value={`${noSickDays} Tg.`}
            subtitle={'In diesem Jahr'}
            SvgIcon={SickOutlinedIcon}
          />
        </Grid>
      </Stack>
    </>
  );
};

export default UserHomePage;
