import z from "zod";

export const CampaignUserQueryDTOSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  platform: z.string().nullable(),
  subgroup: z.string().nullable(),
  postMemo: z.string().nullable(),
});

export type CampaignUserQueryDTO = z.infer<typeof CampaignUserQueryDTOSchema>;
