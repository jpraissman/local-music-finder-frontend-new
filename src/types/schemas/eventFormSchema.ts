import { z } from "zod";
import { placeTypeSchema } from "../PlaceType";
import { dayjsDateSchema, dayjsTimeSchema, facebookUrlSchema, instagramUrlSchema, phoneSchema, urlSchema } from "./generalSchemas";

export const eventFormSchema = z
  .object({
    venueName: z.string().min(1),
    bandName: z.string().min(1),
    bandType: z.string().min(1),
    tributeBandName: z.union([z.literal(""), z.string()]),
    genres: z.array(z.string()).min(1),
    venueAddress: placeTypeSchema,
    eventDate: dayjsDateSchema,
    eventStartTime: dayjsTimeSchema,
    eventEndTime: z.union([z.null(), dayjsTimeSchema]),
    email: z.string().email(),
    phone: phoneSchema,
    hasCoverCharge: z.enum(["Yes", "No"]),
    coverCharge: z.string(),
    facebookHandle: z.union([z.literal(""), facebookUrlSchema]),
    instagramHandle: z.union([z.literal(""), instagramUrlSchema]),
    website: z.union([z.literal(""), urlSchema]),
    bandOrVenue: z.enum(["Venue", "Band/Performer"]),
    otherInfo: z.string(),
    agreeToTerms: z.literal(true),
  })
  .refine(
    (data) =>
      data.bandType !== "Tribute Band" ||
      (data.bandType === "Tribute Band" && data.tributeBandName),
    {
      path: ["tributeBandName"],
      message: "Tribute band name is required.",
    }
  )
  .refine(
    (data) =>
      (data.hasCoverCharge === "Yes" && data.coverCharge) ||
      data.hasCoverCharge === "No",
    {
      path: ["coverCharge"],
      message: "Cover Charge is required.",
    }
  );

export type EventFormFields = z.infer<typeof eventFormSchema>;