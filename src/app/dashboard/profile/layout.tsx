import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profil ─ Ladeva CMS",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
