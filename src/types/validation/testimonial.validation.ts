import { z } from "zod";

export const TestimonialFormSchema = z.object({
  name: z.string({ message: "Nama tidak boleh kosong" }),
  profession: z.string({ message: "Profesi / Jabatan tidak boleh kosong" }),
  message: z.string({ message: "Pesan tidak boleh kosong" }),
  is_featured: z.boolean().optional(),
  avatar_url: z.string().optional(),
});
