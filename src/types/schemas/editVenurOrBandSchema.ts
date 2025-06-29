import { z } from "zod";
import { facebookUrlSchema, instagramUrlSchema, urlSchema } from "./generalSchemas";

export const editVenueOrBandSchema = z
  .object({
    facebook_url: z.union([z.literal(""), facebookUrlSchema]),
    instagram_url: z.union([z.literal(""), instagramUrlSchema]),
    website_url: z.union([z.literal(""), urlSchema]),
  });

export type EditVenueOrBandFields = z.infer<typeof editVenueOrBandSchema>;