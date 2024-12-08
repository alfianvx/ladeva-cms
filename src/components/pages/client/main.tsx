import ClientContent from "@/components/layouts/client/client-content";
import Header from "@/components/layouts/header";
import React from "react";

export default function MainClient() {
  return (
    <React.Fragment>
      <Header
        title="Halaman Client"
        isCreateMode={false}
        url_to="/dashboard/client/create"
        button_title="Tambah Client"
      />
      <ClientContent />
    </React.Fragment>
  );
}
