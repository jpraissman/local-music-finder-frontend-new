import { z } from "zod";
import { placeTypeSchema } from "../../newTypes/Location";
import { DateRange, isDateRange } from "react-day-picker";

export const searchFormSchema = z.object({
  location: placeTypeSchema,
  maxDistance: z.string(),
  bandTypes: z.array(z.string()),
  genres: z.array(z.string()),
  dateRange: z.custom<DateRange>(
    (dateRange) => {
      return isDateRange(dateRange);
    },
    {
      message: "This field is required.",
    }
  ),
});

export type SearchFormFields = z.infer<typeof searchFormSchema>;
