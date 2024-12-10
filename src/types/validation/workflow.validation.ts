import { z } from "zod";

export const WorkflowFormSchema = z.object({
  title: z.string({ message: "Title tidak boleh kosong" }),
  description: z.string({ message: "Deskripsi tidak boleh kosong" }),
  icon_url: z.string().optional(),
});
