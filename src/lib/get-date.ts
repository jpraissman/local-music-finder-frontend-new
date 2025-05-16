import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isoWeek from 'dayjs/plugin/isoWeek';

export default function getDate(query: "today" | "week") {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(isoWeek);

  const nyTimeRightNow = dayjs().tz("America/New_York");

  if (query === "today") {
    return nyTimeRightNow.format("YYYY-MM-DD");
  } else {
    return nyTimeRightNow.isoWeekday(1).format("YYYY-MM-DD")
  }
}