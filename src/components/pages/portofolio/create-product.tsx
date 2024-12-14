import React from "react";
import Header from "@/components/layouts/header";
import CreatePortofolioForm from "@/components/layouts/portofolio/create-form";

export default function CreateProduct() {
  return (
    <React.Fragment>
      <Header title="Buat Portofolio Baru" isCreateMode={true} />
      <CreatePortofolioForm />
    </React.Fragment>
  );
}
