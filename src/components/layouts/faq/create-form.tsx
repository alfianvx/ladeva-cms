"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaqFormSchema } from "@/types/validation/faq.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFaqContent } from "@/services/dashboard/faq";
import { useSession } from "next-auth/react";
import { CircleX, LoaderCircle, Save } from "lucide-react";
import { toast } from "sonner";

export default function CreateFaqForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const session = useSession();

  const token = session.data?.access_token;

  const mutation = useMutation({
    mutationKey: ["CREATE_FAQ"],
    mutationFn: (values: z.infer<typeof FaqFormSchema>) =>
      createFaqContent(values, token),
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan faq!");
      queryClient.invalidateQueries({ queryKey: ["GET_FAQS"] });
      router.push("/dashboard/faq");
    },
    onError: (error) => {
      console.error("Submission error:", error);
      toast.error("Terjadi kesalahan saat menambahkan faq : " + error.message);
    },
  });

  const form = useForm<z.infer<typeof FaqFormSchema>>({
    resolver: zodResolver(FaqFormSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  function onSubmit(values: z.infer<typeof FaqFormSchema>) {
    mutation.mutate(values);
  }

  return (
    <section className="my-10">
      <Card className="max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="pt-[24px] flex flex-col space-y-5">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pertanyaan</FormLabel>
                    <FormControl>
                      <Input placeholder="Pertanyaan kamu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jawaban</FormLabel>
                    <FormControl>
                      <Input placeholder="Jawaban kamu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex gap-3 justify-end">
              <Button variant="destructive" asChild>
                <Link href="/dashboard/faq">
                  <CircleX /> Batal
                </Link>
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <Save />
                )}
                {mutation.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </section>
  );
}
