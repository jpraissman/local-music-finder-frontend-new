import z from "zod";
import { requiredString } from "../util";

export const LocationDTOSchema = z.object(
  {
    address: requiredString(300),
    locationId: requiredString(300),
  },
  { error: "This is required" }
);

export type LocationDTO = z.infer<typeof LocationDTOSchema>;
