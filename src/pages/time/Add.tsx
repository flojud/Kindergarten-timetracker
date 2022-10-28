import MainContainer from '../../components/MainContainer';
import DateRangePicker from '../../components/DateRangePicker';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import AddDate from '../../components/AddDate';

const Add = () => {
  const [days, setDays] = useState<Dayjs[]>([]);

  const handleDateRangePicker = (dateRange: Dayjs[]) => {
    setDays(dateRange);
  };

  return (
    <>
      <MainContainer>
        <DateRangePicker onChange={handleDateRangePicker} />
        {days.map((day) => (
          <AddDate key={day.toISOString()} day={day} />
        ))}
      </MainContainer>
    </>
  );
};

export default Add;
