import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, CardHeader, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Dayjs } from 'dayjs';
import locale from 'dayjs/locale/de';
import { useEffect, useState } from 'react';
import useStore from '../../hooks/useStore';
import { IAbsence } from '../../interfaces/Types';

type AbsencesCardProperties = {
  days: Dayjs[] | null;
};

const AbsencesCard = ({ days }: AbsencesCardProperties) => {
  const { getAbsences, deleteAbsence } = useStore();
  const [absences, setAbsences] = useState<IAbsence[] | null>(null);
  const [month, setMonth] = useState<string | null>(null);

  useEffect(() => {
    if (days && days?.length > 0) {
      const from = days[0].locale({ ...locale }).unix();
      const to = days[days.length - 1].locale({ ...locale }).unix();
      getAbsences(from, to).then((a) => setAbsences(a));
      setMonth(days[0].locale({ ...locale }).format('MMMM'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const remove = (absence: IAbsence) => {
    deleteAbsence(absence);

    setAbsences((prevState) => {
      if (prevState) {
        return prevState.filter((item) => item != absence);
      } else {
        return null;
      }
    });
  };

  return (
    <>
      {absences && absences.length > 0 && (
        <Card sx={{ width: '100%' }}>
          {month && <CardHeader title={`Abwesenheiten im ${month}`}></CardHeader>}
          <CardContent>
            <List dense>
              {absences.map((absence, index) => (
                <ListItem
                  sx={{ paddingLeft: '0px' }}
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" size="small" onClick={() => remove(absence)}>
                      <DeleteIcon />
                    </IconButton>
                  }>
                  <ListItemText primary={`${absence.absencetype} - ${absence.day}`} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AbsencesCard;
