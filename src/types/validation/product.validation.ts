import { z } from "zod";

export const ProductFormSchema = z.object({
  title: z.string(),
  short_description: z.string(),
  description: z.string(),
  thumbnail_url: z.string().optional(),
  logo_url: z.string().optional(),
});
