import React from "react";
import Header from "@/components/layouts/header";
import CreateServiceForm from "@/components/layouts/service/create-form";

export default function CreateService() {
  return (
    <React.Fragment>
      <Header title="Tambah Layanan Baru" isCreateMode={true} />
      <CreateServiceForm />
    </React.Fragment>
  );
}
