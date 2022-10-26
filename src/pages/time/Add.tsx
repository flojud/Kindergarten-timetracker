import MainContainer from '../../components/MainContainer';
import DateRangePicker from '../../components/DateRangePicker';
import { IDateRange } from '../../interfaces/Data';

const Add = () => {
  const handleDateRangePicker = (dateRange: IDateRange) => {
    console.log(dateRange);
  };
  return (
    <>
      <MainContainer>
        <DateRangePicker onChange={handleDateRangePicker} />
      </MainContainer>
    </>
  );
};

export default Add;
