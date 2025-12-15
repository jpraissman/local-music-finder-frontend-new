import z from "zod";

export const QueryDetailDTOSchema = z.object({
  name: z.string(),
  totalUsers: z.number(),
  totalUniqueUsers: z.number(),
});

export type QueryDetailDTO = z.infer<typeof QueryDetailDTOSchema>;

export const CampaignQueryResponseDTOSchema = z.object({
  sublayerDetails: z.array(QueryDetailDTOSchema),
  pathDetails: z.array(QueryDetailDTOSchema),
});

export type CampaignQueryResponseDTO = z.infer<
  typeof CampaignQueryResponseDTOSchema
>;
