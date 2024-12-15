import CreateClientForm from "@/components/layouts/client/create-form";
import Header from "@/components/layouts/header";
import React from "react";

export default function CreateClient() {
  return (
    <React.Fragment>
      <Header title="Tambah Partner Baru" isCreateMode={true} />
      <CreateClientForm />
    </React.Fragment>
  );
}
