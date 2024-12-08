import Header from "@/components/layouts/header";
import CreateProductForm from "@/components/layouts/product/create-form";
import React from "react";

export default function CreateProduct() {
  return (
    <React.Fragment>
      <Header title="Buat Produk Baru" isCreateMode={true} />
      <CreateProductForm />
    </React.Fragment>
  );
}
