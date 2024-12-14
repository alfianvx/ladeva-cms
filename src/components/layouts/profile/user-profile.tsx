"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoaderCircle, Save } from "lucide-react";

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

export default function UserProfileForm() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const token = session?.access_token;

  const form = useForm<z.infer<typeof UserUpdateFormSchema>>({
    resolver: zodResolver(UserUpdateFormSchema),
    defaultValues: {
      name: session?.user.name || "",
      email: session?.user.email || "",
      avatar: session?.user.avatar || "",
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

      toast.success("Profile successfully updated.");
      router.push("/dashboard/profile");
    },
    onError: (error) => {
      console.error("Submission error:", error);
      toast.error("Failed to update profile.");
    },
  });

  function onSubmit(values: z.infer<typeof UserUpdateFormSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="p-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={form.getValues("avatar") || session?.user.avatar}
                    alt="Avatar"
                  />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                {mutation.isPending ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
