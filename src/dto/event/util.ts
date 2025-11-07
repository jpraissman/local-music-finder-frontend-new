import dayjs from "dayjs";
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

export const dayjsDateSchema = z
  .union([z.string(), z.custom<dayjs.Dayjs>().refine(dayjs.isDayjs)])
  .transform((value) => {
    if (dayjs.isDayjs(value)) {
      return value.format("YYYY-MM-DD");
    }
    return dayjs(value).format("YYYY-MM-DD");
  });

export const dayjsTimeSchema = z
  .union([z.string(), z.custom<dayjs.Dayjs>().refine(dayjs.isDayjs)])
  .transform((value) => {
    if (dayjs.isDayjs(value)) {
      return value.format("HH:mm");
    }
    return dayjs(`2000-01-01 ${value}`, "YYYY-MM-DD HH:mm").format("HH:mm");
  });
