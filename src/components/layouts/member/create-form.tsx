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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleX, Eye, EyeClosed, LoaderCircle, Save } from "lucide-react";
import { UserRegistFormSchema } from "@/types/validation/user.validation";
import { authUserSignUp } from "@/services/auth";
import { toast } from "sonner";
import React from "react";

export default function CreateMemberForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = React.useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["REGISTER_MEMBER"],
    mutationFn: (values: z.infer<typeof UserRegistFormSchema>) =>
      authUserSignUp(values),
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["GET_MEMBERS"] });
      router.push("/dashboard/teams");
      toast.success("Berhasil menambahkan member baru");
    },
    onError: (error) => {
      console.error("Submission error:", error);
    },
  });

  const form = useForm<z.infer<typeof UserRegistFormSchema>>({
    resolver: zodResolver(UserRegistFormSchema),
  });

  function onSubmit(values: z.infer<typeof UserRegistFormSchema>) {
    mutation.mutate({
      name: values.name,
      email: values.email,
      role: values.role,
      password: values.password,
    });
  }

  return (
    <section className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 space-y-0">
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
            name="email"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 space-y-0">
                <FormLabel className="col-span-1 text-base">Email</FormLabel>
                <div className="col-span-2 space-y-2">
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 space-y-0">
                <FormLabel className="col-span-1 text-base">Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="col-span-2 space-y-2">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 space-y-0">
                <FormLabel className="col-span-1 text-base">Password</FormLabel>
                <div className="col-span-2 space-y-2">
                  <FormControl className="relative">
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye /> : <EyeClosed />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 space-y-0">
                <FormLabel className="col-span-1 text-base">
                  Konfirmasi Password
                </FormLabel>
                <div className="col-span-2 space-y-2">
                  <FormControl className="relative">
                    <div className="relative">
                      <Input
                        type={confirmShowPassword ? "text" : "password"}
                        autoComplete="current-password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() =>
                          setConfirmShowPassword(!confirmShowPassword)
                        }
                      >
                        {confirmShowPassword ? <Eye /> : <EyeClosed />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex gap-3 justify-end">
            <Button variant="destructive" asChild>
              <Link href="/dashboard/teams">
                <CircleX /> Batal
              </Link>
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Save />
              )}
              {mutation.isPending ? "Memproses..." : "Registrasi"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
