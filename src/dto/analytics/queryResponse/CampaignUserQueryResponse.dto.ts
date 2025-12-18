import z from "zod";
import { QueryDetailDTOSchema } from "./QueryDetail.dto";

export const CampaignUserQueryResponseDTOSchema = z.object({
  totalUsers: z.number(),
  totalUniqueUsers: z.number(),
  sublayerDetails: z.array(QueryDetailDTOSchema),
  pathDetails: z.array(QueryDetailDTOSchema),
});

export type CampaignUserQueryResponseDTO = z.infer<
  typeof CampaignUserQueryResponseDTOSchema
>;
