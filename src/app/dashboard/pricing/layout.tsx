import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penawaran ─ Ladeva CMS",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
