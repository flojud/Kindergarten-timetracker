import {
  Card,
  CardHeader,
  CardContent,
  FormControlLabel,
  Switch,
  TextField,
  Slider,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Button,
  CardActions,
  Checkbox,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { IProfile, IWorkingdays } from '../../interfaces/Profile';

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
  const [weeklyWorkingHours, setWeeklyWorkingHours] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<number>(0);
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

  // loads firebase firestore profile data
  useEffect(() => {
    console.log(profile);
    setMonday(profile.workingdays.monday as boolean);
    setTuesday(profile.workingdays.tuesday as boolean);
    setWednesday(profile.workingdays.wednesday as boolean);
    setThursday(profile.workingdays.thursday as boolean);
    setFriday(profile.workingdays.friday as boolean);
    setSaturday(profile.workingdays.saturday as boolean);
    setSunday(profile.workingdays.sunday as boolean);
    setState(profile.state as string);
    setHolidaysPerYear(profile.holidays as number);
    setWeeklyWorkingHours((profile.workingtime + profile.availabletime) as number);
    setSliderValue(((profile.workingtime / (profile.workingtime + profile.availabletime)) * 100) as number);
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

    if (sliderValue > 0) {
      const workingtime = weeklyWorkingHours * (sliderValue / 100);
      const availabletime = weeklyWorkingHours * ((100 - sliderValue) / 100);
      newProfile.workingtime = workingtime;
      newProfile.availabletime = availabletime;
    }

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
            type="number"
            label="Wochenarbeitszeiten"
            value={weeklyWorkingHours}
            onChange={(e) => setWeeklyWorkingHours(e.target.value as unknown as number)}
            sx={{ width: '100%' }}
            helperText="Wie viel Stunden arbeitest du in der Woche?"
          />
          <Typography id="input-slider" component={'span'} gutterBottom>
            Arbeitszeit am Kind / Verfügungszeit
          </Typography>
          <Slider
            aria-label="Always visible"
            value={sliderValue}
            onChange={(e: Event, newValue: number | number[]) => setSliderValue(newValue as number)}
            step={10}
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
          />
          <FormHelperText>In welchem %-Verhältnis ist deine Arbeitszeit am Kind zur Verfügungszeit?</FormHelperText>
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
