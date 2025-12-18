import z from "zod";
import { QueryDetailDTOSchema } from "./QueryDetail.dto";

export const SearchUserQueryResponseDTOSchema = z.object({
  totalCustomSearches: z.number(),
  totalUniqueUsersWhoSearched: z.number(),
  counties: z.array(QueryDetailDTOSchema),
  towns: z.array(QueryDetailDTOSchema),
  formattedAddresses: z.array(QueryDetailDTOSchema),
});

export type SearchUserQueryResponseDTO = z.infer<
  typeof SearchUserQueryResponseDTOSchema
>;
