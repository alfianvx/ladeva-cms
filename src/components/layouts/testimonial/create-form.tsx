/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { CircleX, LoaderCircle, Save } from "lucide-react";
import { TestimonialFormSchema } from "@/types/validation/testimonial.validation";
import { createTestimonialContent } from "@/services/dashboard/testimonial";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateTestimonialForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const session = useSession();

  const token = session.data?.access_token;

  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);

  const mutation = useMutation({
    mutationKey: ["CREATE_TESTIMONIAL"],
    mutationFn: (values: z.infer<typeof TestimonialFormSchema>) =>
      createTestimonialContent(values, token),
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan testimoni!");
      queryClient.invalidateQueries({ queryKey: ["GET_TESTIMONIAL"] });
      router.push("/dashboard/testimonial");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          "Terjadi kesalahan saat menambahkan testimoni : " +
            error.response?.data.message
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  const form = useForm<z.infer<typeof TestimonialFormSchema>>({
    resolver: zodResolver(TestimonialFormSchema),
    defaultValues: {
      avatar_url:
        "https://utfs.io/f/YdQML4nhRlwkN90TMSCGVd7pO39Ng1cK06SyfhsAHe4BCkuJ",
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
          <label className="text-base">Foto User</label>
          <span className="text-xs ml-3">( opsional )</span>
        </div>
        <div className="col-span-2 flex items-center gap-3">
          <UploadButton<OurFileRouter, any>
            endpoint="imageUploader"
            appearance={{
              container:
                "w-32 h-32 border border-dashed dark:border-gray-400 border-zinc-800 p-2 rounded-lg",
              button:
                "w-full h-full border border-dashed rounded-lg bg-zinc-800 dark:border-gray-400 border-zinc-800",
            }}
            onClientUploadComplete={(file) => {
              form.setValue("avatar_url", file[0].appUrl);
              setAvatarPreview(file[0].appUrl);
            }}
          />
          {avatarPreview && (
            <div className="relative">
              <Image
                src={avatarPreview}
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
          )}
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
          <FormField
            control={form.control}
            name="is_featured"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3">
                <FormLabel className="col-span-1 text-base">
                  Testimoni Highlight
                </FormLabel>
                <div className="col-span-2 space-y-2">
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormDescription>
                        Ceklist jika testimonial ini akan di jadiakan
                        heightlight
                      </FormDescription>
                    </div>
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
              {mutation.isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
