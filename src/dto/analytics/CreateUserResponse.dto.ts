import { z } from "zod";

export const CreateUserResponseDTOSchema = z.object({
  userId: z.string(),
});

export type CreateUserResponseDTO = z.infer<typeof CreateUserResponseDTOSchema>;
