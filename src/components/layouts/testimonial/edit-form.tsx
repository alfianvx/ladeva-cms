/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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
import { TestimonialFormSchema } from "@/types/validation/testimonial.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { CircleX, LoaderCircle, Save } from "lucide-react";
import { updateTestimonialContent } from "@/services/dashboard/testimonial";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import React from "react";

type TTestimonial = {
  id: string;
  name: string;
  profession: string;
  message: string;
  avatar_url: string;
};

export default function EditTestimonialForm({ data }: { data: TTestimonial }) {
  const router = useRouter();
  const session = useSession();
  const token = session.data?.access_token;
  const query = useQueryClient();

  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(
    data.avatar_url
  );

  const form = useForm<z.infer<typeof TestimonialFormSchema>>({
    resolver: zodResolver(TestimonialFormSchema),
    defaultValues: {
      name: data.name,
      profession: data.profession,
      message: data.message,
      avatar_url: data.avatar_url,
    },
  });

  const mutation = useMutation({
    mutationKey: ["UPDATE_TESTIMONIAL", data.id],
    mutationFn: (values: z.infer<typeof TestimonialFormSchema>) =>
      updateTestimonialContent(data.id, values, token),
    onSuccess: () => {
      form.reset();
      router.push("/dashboard/testimonial");
      query.invalidateQueries({ queryKey: ["GET_SINGLE_TESTIMONIAL"] });
    },
    onError: (error) => {
      console.error("Submission error:", error);
    },
  });

  function onSubmit(values: z.infer<typeof TestimonialFormSchema>) {
    mutation.mutate(values);
  }

  function deleteAvatar() {
    form.setValue("avatar_url", "");
    setAvatarPreview(null);
  }

  return (
    <section className="p-4">
      <div className="grid grid-cols-3 mb-4">
        <div className="col-span-1 items-center">
          <label className="text-base">Upload Avatar</label>
          <span className="text-xs ml-3">( opsional )</span>
        </div>
        <div className="col-span-2 flex items-center gap-3">
          <UploadButton<OurFileRouter, any>
            endpoint="imageUploader"
            appearance={{
              container: "w-32 h-32 border border-dashed p-2 rounded-lg",
              button:
                "w-full h-full border border-dashed rounded-lg bg-zinc-800 dark:border-gray-300 border-zinc-800 ",
            }}
            onClientUploadComplete={(file) => {
              form.setValue("avatar_url", file[0].appUrl);
              setAvatarPreview(file[0].appUrl);
            }}
          />
          {form.getValues("avatar_url") !== "" && avatarPreview !== null ? (
            <div className="relative">
              <Image
                src={form.getValues("avatar_url") ?? avatarPreview}
                priority
                alt="avatar"
                width={100}
                height={100}
                className="h-full w-32 object-cover rounded-lg"
              />
              <Button
                size="icon"
                className="rounded-full absolute -top-3 -right-3 p-1"
                onClick={deleteAvatar}
              >
                <CircleX size={10} />
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3">
                <FormLabel className="col-span-1 text-base">Nama</FormLabel>
                <div className="col-span-2 space-y-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3">
                <FormLabel className="col-span-1 text-base">
                  Profesi / Jabatan
                </FormLabel>
                <div className="col-span-2 space-y-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3">
                <FormLabel className="col-span-1 text-base">Pesan</FormLabel>
                <div className="col-span-2 space-y-2">
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-3 mt-4">
            <Button variant="destructive" asChild>
              <Link href="/dashboard/testimonial">
                <CircleX /> Batal
              </Link>
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Save />
              )}
              {mutation.isPending ? "Mengupdate..." : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
