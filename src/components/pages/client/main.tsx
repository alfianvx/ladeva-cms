import ClientContent from "@/components/layouts/client/client-main";
import Header from "@/components/layouts/header";
import React from "react";

export default function MainClient() {
  return (
    <React.Fragment>
      <Header
        title="Halaman Daftar Partner"
        isCreateMode={false}
        url_to="/dashboard/client/create"
        button_title="Tambah Partner"
      />
      <ClientContent />
    </React.Fragment>
  );
}
