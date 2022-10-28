import React from 'react';
import { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs';

interface AddDateProps {
  day: Dayjs;
}
const AddDate = ({ day }: AddDateProps) => {
  return <div>{day.toISOString()}</div>;
};

export default AddDate;
