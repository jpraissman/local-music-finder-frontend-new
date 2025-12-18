import { z } from "zod";

export const CreateSearchUserEventDTOSchema = z.object({
  userId: z.uuid(),
  campaignId: z.number(),
  locationId: z.string(),
});

export type CreateSearchUserEventDTO = z.infer<
  typeof CreateSearchUserEventDTOSchema
>;
