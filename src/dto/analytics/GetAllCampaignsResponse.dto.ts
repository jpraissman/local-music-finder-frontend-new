import z from "zod";

export const GetAllCampaignsDTOSchema = z.array(
  z.object({
    platform: z.string(),
    subgroup: z.string(),
    postMemo: z.string(),
  })
);

export type GetAllCampaignsDTO = z.infer<typeof GetAllCampaignsDTOSchema>;
