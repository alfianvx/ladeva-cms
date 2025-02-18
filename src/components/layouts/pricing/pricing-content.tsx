"use client";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ellipsis, LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Loading from "@/app/loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  deletePricingContent,
  getPricingsContent,
} from "@/services/dashboard/pricing";
import { TPricing } from "@/types/schema/Pricing";
import { toast } from "sonner";

export default function PricingContent() {
  const queryClient = useQueryClient();
  const session = useSession();
  const token = session.data?.access_token;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["GET_PRICINGS"],
    queryFn: getPricingsContent,
  });

  const mutation = useMutation({
    mutationKey: ["DELETE_PRICING"],
    mutationFn: (id: string) => deletePricingContent(id, token),
    onSuccess: () => {
      toast.success("Berhasil menghapus tawaran!");
      queryClient.invalidateQueries({ queryKey: ["GET_PRICINGS"] });
    },
  });

  const handleDeleteItem = (id: string) => {
    mutation.mutate(id);
  };

  if (isLoading && isFetching) {
    return <Loading />;
  }

  if (data.data.length === 0)
    return (
      <div className="flex flex-col gap-4 justify-center items-center my-56 px-4">
        <span>Belum ada daftar penawaran</span>
        <Button asChild>
          <Link href="/dashboard/workflow/create">
            <Plus /> Tambah Penawaran Baru
          </Link>
        </Button>
      </div>
    );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-1">
      {data.data.map((item: TPricing) => (
        <Card className="p-0" key={item.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center">
              <CardTitle>
                <h1 className="text-2xl">{item.title}</h1>
              </CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="p-0">
                <button>
                  <Ellipsis size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup className="space-y-1">
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Button asChild variant="secondary">
                      <Link href={`/dashboard/pricing/edit/${item.id}`}>
                        <Pencil /> Edit
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
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
                            onClick={() => handleDeleteItem(item.id)}
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
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p className="text-md">{item.description}</p>
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-wrap items-start gap-2">
            {item.offer.map((offer, index) => (
              <div
                key={index}
                className="bg-gray-100 text-xs text-stone-900 px-2 py-1 rounded-md"
              >
                <span className="text-sm">{offer}</span>
              </div>
            ))}
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
