import z from "zod";

export const CreateCampaignResponseDTOSchema = z.object({
  campaignId: z.number(),
});

export type CreateCampaignResponseDTO = z.infer<
  typeof CreateCampaignResponseDTOSchema
>;
