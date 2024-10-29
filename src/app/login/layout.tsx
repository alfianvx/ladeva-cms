import { Metadata } from "next";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ladeva Admin CMS | Login",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return <section>{children}</section>;
}
