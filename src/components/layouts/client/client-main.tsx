"use client";
import * as React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
import { deleteClient, getClients } from "@/services/dashboard/client";
import { TClient } from "@/types/schema/Client";
import Image from "next/image";

export default function ClientMain() {
  const queryClient = useQueryClient();
  const session = useSession();
  const token = session.data?.access_token;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["GET_CLIENTS"],
    queryFn: getClients,
  });

  const mutation = useMutation({
    mutationKey: ["DELETE_CLIENT"],
    mutationFn: (id: string) => deleteClient(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CLIENTS"] });
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
        <span>Belum ada client terdaftar</span>
        <Button asChild>
          <Link href="/dashboard/client/create">
            <Plus /> Tambah Client Baru
          </Link>
        </Button>
      </div>
    );

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
      {data.data.map((item: TClient) => (
        <Card key={item.id}>
          <CardContent className="flex flex-col gap-5 justify-center items-center mt-[24px]">
            <div className="w-56 h-24 flex justify-center">
              <Image
                className="object-contain"
                src={item.logo_url}
                alt={item.name}
                priority
                layout="responsive"
                width={100}
                height={100}
              />
            </div>
            <div>
              <h1 className="text-md font-semibold">{item.name}</h1>
            </div>
          </CardContent>
          <CardFooter className="flex gap-3 items-center justify-center">
            <Button asChild>
              <Link href={`/dashboard/client/edit/${item.id}`}>
                <Pencil /> Edit
              </Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 /> Hapus
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
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
