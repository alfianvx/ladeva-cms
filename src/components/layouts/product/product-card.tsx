import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProduct } from "@/services/dashboard/product";
import { TProduct } from "@/types/schema/Product";
import { Avatar } from "@radix-ui/react-avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, Ellipsis, LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { convertDate } from "@/utils/dateConverter";

const ProductCard = ({ product }: { product: TProduct }) => {
  const queryClient = useQueryClient();
  const session = useSession();
  const token = session.data?.access_token;

  const mutation = useMutation({
    mutationKey: ["DELETE_PRODUCT"],
    mutationFn: (id: string) => deleteProduct(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCTS"] });
    },
  });

  const handleDeleteItem = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <Card className="p-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Avatar className="mr-4 size-8">
            <AvatarImage src={product.logo_url} alt={product.name} />
            <AvatarFallback>LP</AvatarFallback>
          </Avatar>
          <CardTitle>{product.name}</CardTitle>
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
                  <Link href={`/dashboard/product/edit/${product.id}`}>
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
                        onClick={() => handleDeleteItem(product.id)}
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
        <CardDescription className="line-clamp-2 hyphens-auto break-words">
          {product.short_description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Badge color="primary" className="mt-2 rounded-full">
          <Calendar size={12} className="mr-2" />
          {convertDate(product.createdAt)}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
