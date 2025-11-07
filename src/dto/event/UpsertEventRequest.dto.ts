import { BandType, EventCreatorType, Genre } from "@/newTypes";
import { z } from "zod";
import {
  dayjsDateSchema,
  dayjsTimeSchema,
  facebookUrlSchema,
  instagramUrlSchema,
  urlSchema,
} from "./util";
import dayjs from "dayjs";

export const UpsertEventRequestDTOSchema = z
  .object({
    bandName: z.string().min(1).max(100).trim(),
    bandType: z.nativeEnum(BandType),
    tributeBandName: z.string().min(1).max(100).nullable().optional(),
    genres: z.array(z.nativeEnum(Genre)).min(1),
    venueName: z.string().min(1).max(100).trim(),
    address: z.string().min(1).max(255),
    venueFacebookUrl: facebookUrlSchema.nullable().optional(),
    venueInstagramUrl: instagramUrlSchema.nullable().optional(),
    venueWebsiteUrl: urlSchema.nullable().optional(),
    bandFacebookUrl: facebookUrlSchema.nullable().optional(),
    bandInstagramUrl: instagramUrlSchema.nullable().optional(),
    bandWebsiteUrl: urlSchema.nullable().optional(),
    venuePhone: z.string().min(10).max(20).nullable().optional(),
    posterEmail: z.string().email().min(1).max(255),
    eventDate: dayjsDateSchema,
    startTime: dayjsTimeSchema,
    endTime: dayjsTimeSchema.nullable().optional(),
    coverCharge: z.number().min(0),
    additionalInfo: z.string().max(1000).nullable().optional(),
    eventCreator: z.nativeEnum(EventCreatorType),
    agreesToTermsAndPrivacy: z.literal(true),
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
