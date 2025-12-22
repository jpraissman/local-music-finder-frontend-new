import z from "zod";
import { QueryDetailDTOSchema } from "./QueryDetail.dto";
import { BaseQueryResponseDTOSchema } from "./BaseQueryResponse.dto";

export const SearchUserQueryResponseDTOSchema =
  BaseQueryResponseDTOSchema.extend({
    counties: z.array(QueryDetailDTOSchema),
    towns: z.array(QueryDetailDTOSchema),
    formattedAddresses: z.array(QueryDetailDTOSchema),
    searchContexts: z.array(QueryDetailDTOSchema),
  });

export type SearchUserQueryResponseDTO = z.infer<
  typeof SearchUserQueryResponseDTOSchema
>;
