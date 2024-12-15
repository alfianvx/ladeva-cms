import Header from "@/components/layouts/header";
import CreateMemberForm from "@/components/layouts/member/create-form";
import React from "react";

export default function CreateMember() {
  return (
    <React.Fragment>
      <Header title="Registrasi Member Baru" isCreateMode={true} />
      <CreateMemberForm />
    </React.Fragment>
  );
}
