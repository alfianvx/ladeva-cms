import { z } from "zod";

export const ClientFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nama client tidak boleh kosong!" })
    .max(50),
  image: z.string(),
});
