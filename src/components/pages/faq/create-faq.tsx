import CreateFaqForm from "@/components/layouts/faq/create-form";
import Header from "@/components/layouts/header";
import React from "react";

export default function CreateFaq() {
  return (
    <React.Fragment>
      <Header title="Buat Produk Baru" isCreateMode={true} />
      <CreateFaqForm />
    </React.Fragment>
  );
}
