import React from "react";
import Header from "@/components/layouts/header";
import CreatePricingForm from "@/components/layouts/pricing/create-form";

export default function CreatePricing() {
  return (
    <React.Fragment>
      <Header title="Tambah Penawaran Baru" isCreateMode={true} />
      <CreatePricingForm />
    </React.Fragment>
  );
}
