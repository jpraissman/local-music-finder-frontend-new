import { z } from "zod";

export const CreateSearchUserEventDTOSchema = z.object({
  userId: z.uuid(),
  locationId: z.string(),
  searchContext: z.string(),
});

export type CreateSearchUserEventDTO = z.infer<
  typeof CreateSearchUserEventDTOSchema
>;
