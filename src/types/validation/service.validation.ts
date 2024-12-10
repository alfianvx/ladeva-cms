import { z } from "zod";

export const ServiceFormSchema = z.object({
  title: z.string({ message: "Title tidak boleh kosong" }),
  description: z.string({ message: "Deskripsi tidak boleh kosong" }),
  icon_url: z.string().optional(),
});
