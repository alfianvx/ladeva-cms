import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Avatar } from "@radix-ui/react-avatar";
import { Calendar, Ellipsis, Pencil, Trash } from "lucide-react";

type TProduct = {
  name: string;
  description: string;
  thumbnail: string;
  url: string;
  created_at: string;
};

const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <Card className="p-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Avatar className="mr-4 size-8">
            <AvatarImage
              src="https://utfs.io/f/YdQML4nhRlwkixzMSUPU9HB3ZNYDMJpmyXTwQRLVO618GW7l"
              alt={product.name}
            />
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
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Pencil /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash /> Hapus
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2 hyphens-auto break-words">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Badge color="primary" className="mt-2 rounded-full">
          <Calendar size={12} className="mr-2" />
          {product.created_at}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
