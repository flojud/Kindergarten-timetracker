import {
  Card,
  CardHeader,
  CardContent,
  FormGroup,
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
} from '@mui/material';
import { useEffect, useState } from 'react';
import { IProfile, IWorkingdays } from '../../interfaces/Profile';

function valuetext(value: number) {
  return `${value}%`;
}

const MyData = () => {
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

  const [profileData, setProfileData] = useState<IProfile | null>(null);

  useEffect(() => {
    const p: IProfile = {} as IProfile;
    const wd: IWorkingdays = {} as IWorkingdays;

    wd.monday = monday;
    wd.tuesday = tuesday;
    wd.wednesday = wednesday;
    wd.thursday = thursday;
    wd.friday = friday;
    wd.saturday = saturday;
    wd.sunday = sunday;
    p.workingdays = wd;
    p.state = state;
    p.holidays = holidaysPerYear;

    if (sliderValue > 0) {
      const workingtime = weeklyWorkingHours * (sliderValue / 100);
      const availabletime = weeklyWorkingHours * ((100 - sliderValue) / 100);
      p.workingtime = workingtime;
      p.availabletime = availabletime;
    }

    setProfileData(p);
  }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday, holidaysPerYear, weeklyWorkingHours, sliderValue, state]);

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);

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
          <FormGroup>
            <FormControlLabel control={<Switch value={monday} onChange={(e) => setMonday(e.target.checked)} />} label="Montag" />
            <FormControlLabel control={<Switch value={tuesday} onChange={(e) => setTuesday(e.target.checked)} />} label="Dienstag" />
            <FormControlLabel control={<Switch value={wednesday} onChange={(e) => setWednesday(e.target.checked)} />} label="Mittwoch" />
            <FormControlLabel control={<Switch value={thursday} onChange={(e) => setThursday(e.target.checked)} />} label="Donnerstag" />
            <FormControlLabel control={<Switch value={friday} onChange={(e) => setFriday(e.target.checked)} />} label="Freitag" />
            <FormControlLabel control={<Switch value={saturday} onChange={(e) => setSaturday(e.target.checked)} />} label="Samstag" />
            <FormControlLabel control={<Switch value={sunday} onChange={(e) => setSunday(e.target.checked)} />} label="Sonntag" />
            <FormHelperText>An welchen Tagen arbeitest du?</FormHelperText>
          </FormGroup>
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
          <Typography id="input-slider" gutterBottom>
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
          <FormHelperText>
            In welchem %-Verhältnis ist deine Arbeitszeit am Kind zur Verfügungszeit? So ... {profileData?.workingtime}:
            {profileData?.availabletime}?
          </FormHelperText>
        </CardContent>
      </Card>
    </>
  );
};

export default MyData;
