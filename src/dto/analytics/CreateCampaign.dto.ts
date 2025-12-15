import z from "zod";

export const CreateCampaignDTOSchema = z.object({
  platform: z.string(),
  subgroup: z.string(),
  postMemo: z.string(),
});

export type CreateCampaignDTO = z.infer<typeof CreateCampaignDTOSchema>;
