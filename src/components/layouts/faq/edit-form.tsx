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
import { FaqFormSchema } from "@/types/validation/Faq";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFaqContent } from "@/services/platform/faq";
import { useSession } from "next-auth/react";
import { CircleX, Loader, Save } from "lucide-react";

type TFaq = {
  answer: string;
  createdAt: "2024-11-04T03:56:04.314Z";
  id: string;
  question: string;
  updatedAt: string;
};

export default function EditFaqForm({ data }: { data: TFaq }) {
  const router = useRouter();
  const session = useSession();
  const token = session.data?.access_token;
  const query = useQueryClient();

  const form = useForm<z.infer<typeof FaqFormSchema>>({
    resolver: zodResolver(FaqFormSchema),
    defaultValues: {
      question: data.question,
      answer: data.answer,
    },
  });

  const mutation = useMutation({
    mutationKey: ["UPDATE_FAQ", data.id],
    mutationFn: (values: z.infer<typeof FaqFormSchema>) =>
      updateFaqContent(data.id, values, token),
    onSuccess: () => {
      form.reset();
      router.push("/dashboard/faq");
      query.invalidateQueries({ queryKey: ["GET_SINGLE_FAQ"] });
    },
    onError: (error) => {
      console.error("Submission error:", error);
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
                  <Loader className="animate-spin" />
                ) : (
                  <Save />
                )}
                {mutation.isPending ? "Mengupdate..." : "Update"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </section>
  );
}
