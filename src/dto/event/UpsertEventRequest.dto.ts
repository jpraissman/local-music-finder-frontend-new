import { z } from "zod";
import {
  dayjsDateSchema,
  dayjsTimeSchema,
  facebookUrlSchema,
  instagramUrlSchema,
  urlSchema,
} from "./util";
import dayjs from "dayjs";
import { BandType } from "@/newTypes/BandType";
import { Genre } from "@/newTypes/Genre";
import { EventCreatorType } from "@/newTypes/EventCreatorType";
import { requiredString } from "../util";
import { LocationDTOSchema } from "../location/Location.dto";

export const UpsertEventRequestDTOSchema = z
  .object({
    bandName: requiredString(100),
    bandType: z.enum(BandType, { error: "This is required" }),
    tributeBandName: requiredString(100).nullable().optional(),
    genres: z.array(z.enum(Genre)).min(1, { error: "This is required" }),
    venueName: requiredString(100),
    location: LocationDTOSchema,
    venueFacebookUrl: facebookUrlSchema.nullable().optional(),
    venueInstagramUrl: instagramUrlSchema.nullable().optional(),
    venueWebsiteUrl: urlSchema.nullable().optional(),
    bandFacebookUrl: facebookUrlSchema.nullable().optional(),
    bandInstagramUrl: instagramUrlSchema.nullable().optional(),
    bandWebsiteUrl: urlSchema.nullable().optional(),
    venuePhone: requiredString(20).min(10).nullable().optional(),
    posterEmail: z.email({ error: "Please enter a valid email" }),
    eventDate: dayjsDateSchema,
    startTime: dayjsTimeSchema,
    endTime: dayjsTimeSchema.nullable().optional(),
    coverCharge: z
      .number({ error: "This is required" })
      .min(0, { error: "Enter a value greater than 0" }),
    additionalInfo: requiredString(1000).nullable().optional(),
    eventCreator: z.enum(EventCreatorType, { error: "This is required" }),
    agreesToTermsAndPrivacy: z.literal(true, {
      error: "You must agree to the terms",
    }),
  })
  .refine(
    (data) =>
      data.bandType !== BandType.TRIBUTE_BAND ||
      (data.bandType === BandType.TRIBUTE_BAND && data.tributeBandName),
    {
      path: ["tributeBandName"],
      message: "Tribute band name is required.",
    }
  )
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

export type UpsertEventRequestDTOInput = z.input<
  typeof UpsertEventRequestDTOSchema
>;
export type UpsertEventRequestDTO = z.infer<typeof UpsertEventRequestDTOSchema>;
