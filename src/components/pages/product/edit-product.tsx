"use client";

import React from "react";
import Loading from "@/app/loading";
import Header from "@/components/layouts/header";
import EditProductForm from "@/components/layouts/product/edit-form";
import { getProductById } from "@/services/dashboard/product";
import { useQuery } from "@tanstack/react-query";

export default function EditProduct({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["GET_SINGLE_PRODUCT_BY_ID", id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Header title="Buat Produk Baru" isCreateMode={true} />
      <EditProductForm data={data?.data} />
    </React.Fragment>
  );
}
