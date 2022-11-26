import { Button, Card, CardContent, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import useNotification from '../../hooks/useNotification';
import useStore from '../../hooks/useStore';
import { absenceTypes, IAbsence } from '../../interfaces/Types';
import DateRangePicker from '../common/DateRangePicker';
import locale from 'dayjs/locale/de';

const NewAbsence = () => {
  const [range, setRange] = useState<Dayjs[] | null>(null);
  const [absenceType, setAbsenceType] = useState<string | null>(null);
  const [absences, setAbsences] = useState<IAbsence[]>([]);
  const { notifyContext } = useNotification();
  const { saveAbsence } = useStore();

  const onChange = (dateRange: Dayjs[]) => setRange(dateRange);

  useEffect(() => {
    setAbsences(() => {
      const res: IAbsence[] = [];
      if (range && absenceType) {
        range.forEach((item) => {
          res.push({ day: item.locale({ ...locale }).format('YYYY-MM-DD'), absencetype: absenceType } as IAbsence);
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
            <Button variant="contained" onClick={requestAbsence}>
              Beantragen
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
export default NewAbsence;
