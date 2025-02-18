"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Loading from "@/app/loading";

import { getProducts } from "@/services/dashboard/product";
import { TProduct } from "@/types/schema/Product";
import ProductCard from "./product-card";

export default function ProductContent() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["GET_PRODUCTS"],
    queryFn: getProducts,
  });

  if (isLoading && isFetching) {
    return <Loading />;
  }

  if (data.data.length === 0)
    return (
      <div className="flex flex-col gap-4 justify-center items-center my-56 px-4">
        <span>Belum ada Produk</span>
        <Button asChild className="text-xs">
          <Link href="/dashboard/product/create">
            <Plus /> Tambah Produk Baru
          </Link>
        </Button>
      </div>
    );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-1">
      {data.data.map((item: TProduct) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </section>
  );
}
