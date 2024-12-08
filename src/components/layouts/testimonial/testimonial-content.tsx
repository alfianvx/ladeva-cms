"use client";
import * as React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTestimonialContent,
  getTestimonialsContent,
} from "@/services/dashboard/testimonial";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Loading from "@/app/loading";

type TTestimonial = {
  id: string;
  name: string;
  profession: string;
  message: string;
  avatar_url: string;
};

export default function TestimonialContent() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["GET_TESTIMONIAL"],
    queryFn: getTestimonialsContent,
  });

  const queryClient = useQueryClient();
  const session = useSession();
  const token = session.data?.access_token;

  const mutation = useMutation({
    mutationKey: ["DELETE_TESTIMONIAL"],
    mutationFn: (id: string) => deleteTestimonialContent(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_TESTIMONIAL"] });
    },
  });

  const handleDeleteTestimonial = (id: string) => {
    mutation.mutate(id);
  };

  if (isLoading && isFetching) {
    return <Loading />;
  }

  if (data.data.length === 0)
    return (
      <div className="flex flex-col gap-4 justify-center items-center my-56 px-4">
        <span>Belum ada list testimoni yang tersedia</span>
        <Button asChild>
          <Link href="/dashboard/testimonial/create">
            <Plus /> Tambah Testimoni Baru
          </Link>
        </Button>
      </div>
    );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
      {data.data.map((item: TTestimonial) => (
        <Card key={item.id} className="">
          <CardContent className="pt-[24px] text-lg">
            &quot;{item.message}&quot;
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={item.avatar_url} alt={item.name} />
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-md font-semibold">{item.name}</h1>
                <span className="text-sm">{item.profession}</span>
              </div>
            </div>
            <div className="flex item-center gap-2">
              <Button size="icon" asChild>
                <Link href={`/dashboard/testimonial/edit/${item.id}`}>
                  <Pencil />
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Apa kamu yakin ingin mengapus item ini?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Item yang sudah di hapus tidak bisa di kembalikan
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteTestimonial(item.id)}
                    >
                      {mutation.isPending ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        <Trash2 />
                      )}{" "}
                      {mutation.isPending ? "Menghapus..." : "Hapus"}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
