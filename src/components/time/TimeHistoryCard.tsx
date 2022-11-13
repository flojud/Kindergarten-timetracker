import { Dayjs } from 'dayjs';
import React from 'react';

interface TimeHistoryCardProps {
  day: Dayjs;
}
const TimeHistoryCard = ({ day }: TimeHistoryCardProps) => {
  return <>{day.toISOString()}</>;
};

export default TimeHistoryCard;
