"use client";

import { type LucideIcon } from "lucide-react";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";
import { usePathname } from "next/navigation";

export function NavItem({
  title,
  items,
}: {
  title: string;
  items: {
    name: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.name}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={item.name}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname.startsWith(item.url)
                    ? "dark:bg-neutral-800 active:bg-neutral-900 active:text-white bg-neutral-900 text-white hover:bg-muted hover:text-white hover:bg-neutral-800"
                    : "dark:hover:bg-neutral-800 active:bg-neutral-900 active:text-white hover:bg-neutral-900 dark:text-white hover:text-white text-neutral-950",
                  "justify-start w-full"
                )}
              >
                {item.icon && <item.icon className="mr-1" />}
                <Link key={item.url} href={item.url} className="w-full h-full">
                  {item.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
