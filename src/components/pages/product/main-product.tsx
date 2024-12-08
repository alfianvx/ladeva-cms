import Header from "@/components/layouts/header";
import ProductContent from "@/components/layouts/product/product-content";
import React from "react";

export default function MainProduct() {
  return (
    <React.Fragment>
      <Header
        title="Halaman Produk"
        isCreateMode={false}
        url_to="/dashboard/product/create"
        button_title="Buat Produk"
      />
      <ProductContent />
    </React.Fragment>
  );
}
