import { z } from "zod";

export const CreateCampaignUserEventDTOSchema = z.object({
  userId: z.uuid(),
  campaignId: z.number(),
  url: z.string(),
});

export type CreateCampaignUserEventDTO = z.infer<
  typeof CreateCampaignUserEventDTOSchema
>;
