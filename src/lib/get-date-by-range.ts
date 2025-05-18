import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isoWeek from 'dayjs/plugin/isoWeek';

export default function getDateByRange(range: "today" 
  | "tomorrow" | "this-weekend" | "this-week" | "next-weekend" | "next-week") {
    
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(isoWeek);

  const nyTimeRightNow = dayjs().tz("America/New_York");

  if (range === "today") {
    const dateFormatted = nyTimeRightNow.format("YYYY-MM-DD");
    return [dateFormatted, dateFormatted];
  } else if (range === "tomorrow") {
    const dateFormatted = nyTimeRightNow.add(1, 'day').format("YYYY-MM-DD");
    return [dateFormatted, dateFormatted];
  } else if (range === "this-weekend") {
    let startDate;
    if (nyTimeRightNow.day() === 0 || nyTimeRightNow.day() === 6) {
      startDate = nyTimeRightNow.format("YYYY-MM-DD");
    } else {
      startDate = nyTimeRightNow.isoWeekday(5).format("YYYY-MM-DD");
    }
    const endDate = nyTimeRightNow.isoWeekday(7).format("YYYY-MM-DD");
    return [startDate, endDate];
  } else if (range === "this-week") {
    const startDate = nyTimeRightNow.format("YYYY-MM-DD");
    const endDate = nyTimeRightNow.isoWeekday(7).format("YYYY-MM-DD");
    return [startDate, endDate];
  } else if (range === "next-week") {
    const startDate = nyTimeRightNow.isoWeekday(1).add(7, 'day').format("YYYY-MM-DD");
    const endDate = nyTimeRightNow.isoWeekday(7).add(7, 'day').format("YYYY-MM-DD");
    return [startDate, endDate];
  } else {
    const startDate = nyTimeRightNow.isoWeekday(5).add(7, 'day').format("YYYY-MM-DD");
    const endDate = nyTimeRightNow.isoWeekday(7).add(7, 'day').format("YYYY-MM-DD");
    return [startDate, endDate];
  }
}