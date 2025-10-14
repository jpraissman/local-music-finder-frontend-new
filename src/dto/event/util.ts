import { z } from "zod";

export const facebookUrlSchema = z
  .string()
  .regex(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)*facebook\.com\/.+$/, {
    message: "Must be a valid Facebook link",
  });

export const instagramUrlSchema = z
  .string()
  .regex(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)*instagram\.com\/.+$/, {
    message: "Must be a valid Instagram link",
  });

export const urlSchema = z
  .string()
  .regex(/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/, {
    message: "Must be a valid-looking URL",
  });
