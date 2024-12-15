/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CircleX, LoaderCircle, Save } from "lucide-react";

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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { UserUpdateFormSchema } from "@/types/validation/user.validation";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/services/dashboard/user";
import { toast } from "sonner";
import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

export default function UserProfileForm() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const token = session?.access_token;

  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof UserUpdateFormSchema>>({
    resolver: zodResolver(UserUpdateFormSchema),
    defaultValues: {
      name: session?.user.name,
      email: session?.user.email,
      avatar: session?.user.avatar,
    },
  });

  const mutation = useMutation({
    mutationKey: ["UPDATE_PROFILE", session?.user.id],
    mutationFn: (values: z.infer<typeof UserUpdateFormSchema>) =>
      updateProfile(session?.user.id, values, token),
    onSuccess: async (response) => {
      console.log("Update response:", response.data.data);

      update({
        ...session,
        user: {
          ...session?.user,
          name: response.data.data.name,
          email: response.data.data.email,
          avatar: response.data.data.avatar,
        },
      });

      form.reset({
        name: response.data.data.name,
        email: response.data.data.email,
        avatar: response.data.data.avatar,
      });

      setAvatarPreview(null);

      toast.success("Profil berhasil di ubah");
      router.push("/dashboard/profile");
    },
    onError: (error) => {
      console.error("Submission error:", error);
      toast.error("Gagal mengubah profil.");
    },
  });

  function onSubmit(values: z.infer<typeof UserUpdateFormSchema>) {
    mutation.mutate(values);
  }

  function deleteAvatar() {
    form.setValue("avatar", "");
    setAvatarPreview(null);
  }

  return (
    <div className="p-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Profil Saya</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-5 items-center mb-4">
            <div className="col-span-1 items-center">
              <div className="flex items-center space-x-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={form.getValues("avatar") || session?.user.avatar}
                    alt="Avatar"
                  />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <UploadButton<OurFileRouter, any>
                endpoint="imageUploader"
                appearance={{
                  container: "border border-dashed p-2 rounded-lg",
                  button: "text-sm w-10",
                }}
                onClientUploadComplete={(file) => {
                  form.setValue("avatar", file[0].appUrl);
                  setAvatarPreview(file[0].appUrl);
                }}
              />
              {avatarPreview && (
                <div className="relative border h-24 w-24 rounded-lg">
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
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <Save />
                )}
                {mutation.isPending ? "Loading..." : "Simpan Perubahan"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
