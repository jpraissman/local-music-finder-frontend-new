import dayjs from "dayjs";
import { DateRange } from "react-day-picker";

const formatDateRange = (dateRange: DateRange | undefined) => {
  if (dateRange && dateRange.from && dateRange.to) {
    return dayjs(dateRange.from).format("MMMM DD") +
           " - " + dayjs(dateRange.to).format("MMMM DD")
  }
  return "";
}

export default formatDateRange