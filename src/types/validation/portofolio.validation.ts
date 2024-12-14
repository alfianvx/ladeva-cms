import { z } from "zod";

export const PortofolioFormSchema = z.object({
  name: z.string({ message: "Nama portofolio tidak boleh kosong" }),
  short_description: z.string({
    message: "Deskripsi singkat harus tidak boleh kosong",
  }),
  description: z.string(),
  thumbnail_url: z.string().optional(),
  logo_url: z.string().optional(),
});
