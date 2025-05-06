import dayjs from 'dayjs'
import { DateRange } from 'react-day-picker';

export const formatDateRange = (dateRange: DateRange | undefined) => {
  if (dateRange && dateRange.from && dateRange.to) {
    return dayjs(dateRange.from).format("ddd, MMMM DD") +
           " - " + dayjs(dateRange.to).format("ddd, MMMM DD")
  }
  return "";
}