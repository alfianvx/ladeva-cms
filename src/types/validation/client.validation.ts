import { z } from "zod";

export const ClientFormSchema = z.object({
  name: z.string({ message: "Nama partner tidak boleh kosong" }),
  logo_url: z.string().optional(),
});
