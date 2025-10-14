import { z } from "zod";
import { VenueDTOSchema } from "../venue/Venue.dto";
import { BandDTOSchema } from "../band/Band.dto";
import dayjs from "dayjs";

export const EventDTOSchema = z
  .object({
    id: z.number().int(),
    venue: VenueDTOSchema,
    band: BandDTOSchema,
    eventDate: z.string(),
    startTime: z.string(),
    endTime: z.string().nullable().optional(),
    coverCharge: z.number().min(0),
    additionalInfo: z.string().nullable().optional(),
    distanceInMiles: z.number().nullable().optional(),
  })
  .refine((data) => dayjs(data.eventDate, "YYYY-MM-DD").isValid(), {
    path: ["eventDate"],
    message: "eventDate should be a valid date in the YYYY-MM-DD format",
  })
  .refine(
    (data) =>
      dayjs(`2000-01-01 ${data.startTime}`, "YYYY-MM-DD HH:mm").isValid(),
    {
      path: ["startTime"],
      message: "startTime should be a valid time in the HH:mm format",
    }
  )
  .refine(
    (data) =>
      data.endTime
        ? dayjs(`2000-01-01 ${data.endTime}`, "YYYY-MM-DD HH:mm").isValid()
        : true,
    {
      path: ["endTime"],
      message: "endTime should be a valid time in the HH:mm format",
    }
  );

export type EventDTO = z.infer<typeof EventDTOSchema>;
