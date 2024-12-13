import React from "react";
import Header from "@/components/layouts/header";
import PricingContent from "@/components/layouts/pricing/pricing-content";

export default function MainPricing() {
  return (
    <React.Fragment>
      <Header
        title="Halaman Penawaran"
        isCreateMode={false}
        url_to="/dashboard/pricing/create"
        button_title="Tambah Penawaran"
      />
      <PricingContent />
    </React.Fragment>
  );
}
