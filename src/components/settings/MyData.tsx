import {
  Card,
  CardHeader,
  CardContent,
  FormControlLabel,
  Switch,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Button,
  CardActions,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { IProfile, IWorkingdays } from '../../interfaces/Profile';
import TimeUtils from '../../utils/TimeUtils';

function valuetext(value: number) {
  return `${value}%`;
}

const MyData = () => {
  const authContext = useContext(AuthContext);
  // firestore profile object
  const profile = authContext!.profile as IProfile;

  // profile fields
  const [monday, setMonday] = useState<boolean>(false);
  const [tuesday, setTuesday] = useState<boolean>(false);
  const [wednesday, setWednesday] = useState<boolean>(false);
  const [thursday, setThursday] = useState<boolean>(false);
  const [friday, setFriday] = useState<boolean>(false);
  const [saturday, setSaturday] = useState<boolean>(false);
  const [sunday, setSunday] = useState<boolean>(false);
  const [holidaysPerYear, setHolidaysPerYear] = useState<number>(0);
  const [state, setState] = useState('');
  const germanStates = [
    'Baden-Württemberg',
    'Bayern',
    'Berlin',
    'Brandenburg',
    'Bremen',
    'Hamburg',
    'Hessen',
    'Mecklenburg-Vorpommern',
    'Niedersachsen',
    'Nordrhein-Westfalen',
    'Rheinland-Pfalz',
    'Saarland',
    'Sachsen-Anhalt',
    'Sachsen',
    'Schleswig-Holstein',
    'Thüringen',
  ];
  const [workingTimePerDay, setWorkingTimePerDay] = useState<string | null>(null);
  const [availableTimePerDay, setAvailableTimePerDay] = useState<string | null>(null);
  const [numWorkday, setNumWorkday] = useState<number | null>(null);

  // loads firebase firestore profile data
  useEffect(() => {
    setMonday(profile.workingdays.monday as boolean);
    setTuesday(profile.workingdays.tuesday as boolean);
    setWednesday(profile.workingdays.wednesday as boolean);
    setThursday(profile.workingdays.thursday as boolean);
    setFriday(profile.workingdays.friday as boolean);
    setSaturday(profile.workingdays.saturday as boolean);
    setSunday(profile.workingdays.sunday as boolean);
    setState(profile.state as string);
    setHolidaysPerYear(profile.holidays as number);
    setWorkingTimePerDay(TimeUtils.minutesToTime(profile.workingtime));
    setAvailableTimePerDay(TimeUtils.minutesToTime(profile.availabletime));
    setNumWorkday(profile.numWorkday);
  }, [profile]);

  const save = () => {
    const newProfile: IProfile = {} as IProfile;
    const wd: IWorkingdays = {} as IWorkingdays;

    wd.monday = monday;
    wd.tuesday = tuesday;
    wd.wednesday = wednesday;
    wd.thursday = thursday;
    wd.friday = friday;
    wd.saturday = saturday;
    wd.sunday = sunday;
    newProfile.workingdays = wd;
    newProfile.state = state;
    newProfile.holidays = holidaysPerYear;

    if (workingTimePerDay) newProfile.workingtime = TimeUtils.minutesFromTime(workingTimePerDay);
    if (availableTimePerDay) newProfile.availabletime = TimeUtils.minutesFromTime(availableTimePerDay);
    if (numWorkday) newProfile.numWorkday = TimeUtils.numWorkdays(wd);

    authContext?.updateProfile(newProfile);
  };

  return (
    <>
      <Card>
        <CardHeader title="Deine persönlichen Daten"></CardHeader>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            padding: 2,
            gap: 2,
          }}>
          <FormControlLabel control={<Switch checked={monday} onChange={(e) => setMonday(e.target.checked)} />} label="Montag" />
          <FormControlLabel control={<Switch checked={tuesday} onChange={(e) => setTuesday(e.target.checked)} />} label="Dienstag" />
          <FormControlLabel control={<Switch checked={wednesday} onChange={(e) => setWednesday(e.target.checked)} />} label="Mittwoch" />
          <FormControlLabel control={<Switch checked={thursday} onChange={(e) => setThursday(e.target.checked)} />} label="Donnerstag" />
          <FormControlLabel control={<Switch checked={friday} onChange={(e) => setFriday(e.target.checked)} />} label="Freitag" />
          <FormControlLabel control={<Switch checked={saturday} onChange={(e) => setSaturday(e.target.checked)} />} label="Samstag" />
          <FormControlLabel control={<Switch checked={sunday} onChange={(e) => setSunday(e.target.checked)} />} label="Sonntag" />
          <FormHelperText>An welchen Tagen arbeitest du?</FormHelperText>

          <FormControl fullWidth>
            <InputLabel>Bundesland</InputLabel>
            <Select value={state} label="Bundesland" onChange={(e) => setState(e.target.value as string)}>
              {germanStates.flatMap((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Aus welchem Bundesland kommst du?</FormHelperText>
          </FormControl>
          <TextField
            type="number"
            label="Urlaubstage pro Jahr"
            value={holidaysPerYear}
            onChange={(e) => setHolidaysPerYear(e.target.value as unknown as number)}
            sx={{ width: '100%' }}
            helperText="Wie viel Tage Urlaub im Jahr hast du?"
          />
          <TextField
            type="time"
            label="Arbeitszeit am Kind / Tag"
            value={workingTimePerDay}
            onChange={(e) => setWorkingTimePerDay(e.target.value)}
            sx={{ width: '100%' }}
            helperText="Wie viel Stunden arbeitest du pro Arbeitstag am Kind?"
          />
          <TextField
            type="time"
            label="Verfügungszeit / Tag"
            value={availableTimePerDay}
            onChange={(e) => setAvailableTimePerDay(e.target.value)}
            sx={{ width: '100%' }}
            helperText="Wie viel Verfügungszeit hast du pro Tag?"
          />
        </CardContent>
        <CardActions
          sx={{
            padding: 2,
            gap: 2,
          }}>
          <Button variant="contained" onClick={save}>
            Speichern
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default MyData;
