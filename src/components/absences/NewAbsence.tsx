import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import useNotification from '../../hooks/useNotification';
import useStore from '../../hooks/useStore';
import { absenceTypes, IAbsence, IProfile } from '../../interfaces/Types';
import DateRangePicker from '../common/DateRangePicker';
import locale from 'dayjs/locale/de';
import { useNavigate } from 'react-router-dom';
import HolidayUtils from '../../utils/HolidayUtils';
import { AuthContext } from '../../contexts/AuthContextProvider';

const NewAbsence = () => {
  const authContext = useContext(AuthContext);
  const profile = authContext!.profile as IProfile;
  const [range, setRange] = useState<Dayjs[] | null>(null);
  const [absenceType, setAbsenceType] = useState<string | null>(null);
  const [absences, setAbsences] = useState<IAbsence[]>([]);
  const { notifyContext } = useNotification();
  const { saveAbsence } = useStore();
  const navigate = useNavigate();

  const onChange = (dateRange: Dayjs[]) => setRange(dateRange);

  useEffect(() => {
    setAbsences(() => {
      const res: IAbsence[] = [];
      if (range && absenceType) {
        range.forEach((item) => {
          if (HolidayUtils.checkIsWorkday(profile.workingdays, item.locale({ ...locale }), profile.state)) {
            res.push({ day: item.locale({ ...locale }).format('YYYY-MM-DD'), absencetype: absenceType } as IAbsence);
          }
        });
      }
      return res;
    });
  }, [range, absenceType]);

  const requestAbsence = () => {
    if (!absenceType) {
      notifyContext.addNotification('Es wurde keine Abwesenheitsart augewählt', 'error');
    } else {
      if (absences.length > 0) saveAbsence(absences);
      navigate('/absences/view');
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={4}>
            <DateRangePicker onChange={onChange} />

            <FormControl fullWidth>
              <InputLabel>Abwesenheitsart</InputLabel>
              <Select value={absenceType} label="Abwesenheitsart" onChange={(e) => setAbsenceType(e.target.value as string)}>
                {absenceTypes.flatMap((absence) => (
                  <MenuItem key={absence} value={absence}>
                    {absence}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={requestAbsence} color="secondary">
              <Typography variant="button" display="block" color={'text.primary'}>
                Beantragen
              </Typography>
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
export default NewAbsence;
