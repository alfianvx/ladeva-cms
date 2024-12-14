import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layouts/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import BreadcrumbNav from "@/components/breadcrumb-nav";
import { NavUser } from "@/components/layouts/sidebar/nav-user";
import { ThemeSwithcer } from "@/components/theme-switcher";

export const metadata: Metadata = {
  title: "Ladeva Admin CMS | Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex justify-center sticky border-b top-0 dark:bg-zinc-950 bg-white h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 z-50">
            <div className="flex items-center justify-between w-full gap-2 px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadcrumbNav />
              </div>
              <div className="flex items-center gap-4">
                <ThemeSwithcer />
                <Separator
                  orientation="vertical"
                  className="h-4 hidden md:block"
                />
                <NavUser />
              </div>
            </div>
          </header>
          <section>{children}</section>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
