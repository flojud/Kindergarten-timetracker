import { Dayjs } from 'dayjs';
import React from 'react';

interface ViewDateProps {
  day: Dayjs;
}
const ViewDate = ({ day }: ViewDateProps) => {
  return <>{day.toISOString()}</>;
};

export default ViewDate;
