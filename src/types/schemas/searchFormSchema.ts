import { z } from "zod";
import { placeTypeSchema } from "../PlaceType";
import { DateRange, isDateRange } from "react-day-picker";
import dayjs from "dayjs";

const isTodayOrFuture = (date: Date) => {
  const d = dayjs(date);
  return d.isSame(dayjs(), 'day') || d.isAfter(dayjs(), 'day');
};

export const searchFormSchema = z.object({
  location: placeTypeSchema,
  maxDistance: z.string(),
  bandTypes: z.array(z.string()),
  genres: z.array(z.string()),
  dateRange: z.custom<DateRange>((dateRange) => {
    return isDateRange(dateRange)
  }, {
    message: "This field is required."
  }),
}).refine(
  (data) =>
    data.dateRange.from && isTodayOrFuture(data.dateRange.from),
  {
    path: ["dateRange"],
    message: "Please select a date range that is today or in the future.",
  }
)

export type SearchFormFields = z.infer<typeof searchFormSchema>;