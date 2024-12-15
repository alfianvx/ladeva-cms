import Header from "@/components/layouts/header";
import MemberList from "@/components/layouts/member/member-list";
import React from "react";

export default function MainMember() {
  return (
    <React.Fragment>
      <Header
        title="Halaman Member"
        isCreateMode={false}
        url_to="/dashboard/teams/create"
        button_title="Tambah Member"
      />
      <MemberList />
    </React.Fragment>
  );
}
