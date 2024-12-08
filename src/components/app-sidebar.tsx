"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings2,
  MessageSquareQuote,
  Server,
  // Monitor,
  // Smartphone,
  // MonitorSmartphone,
  // CircleHelp,
  // CircleCheck,
  // CircleX,
  // Circle,
  // Clock,
  Users,
  CreditCard,
  Pickaxe,
  Handshake,
  Workflow,
  MessageCircleHeart,
  BadgePercent,
} from "lucide-react";

// import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavItemLink } from "./nav-item-link";

// This is sample data.
const data = {
  teams: [
    {
      name: "Ladeva CMS",
      logo: GalleryVerticalEnd,
    },
    {
      name: "Ladeva SaaS",
      logo: AudioWaveform,
    },
    {
      name: "Ladeva Studio",
      logo: Command,
    },
  ],
  platform: [
    {
      name: "Product",
      url: "/dashboard/product",
      icon: Server,
    },
    {
      name: "Pricing",
      url: "/dashboard/pricing",
      icon: BadgePercent,
    },
    {
      name: "Service",
      url: "/dashboard/service",
      icon: Pickaxe,
    },
    {
      name: "Faq",
      url: "/dashboard/faq",
      icon: MessageSquareQuote,
    },
    {
      name: "Client",
      url: "/dashboard/client",
      icon: Handshake,
    },
    {
      name: "Workflow",
      url: "/dashboard/workflow",
      icon: Workflow,
    },
    {
      name: "Testimonial",
      url: "/dashboard/testimonial",
      icon: MessageCircleHeart,
    },
  ],
  // projects: [
  //   {
  //     title: "Desktop",
  //     url: "/dashboard/projects/desktop",
  //     icon: Monitor,
  //     items: [
  //       {
  //         title: "Backlog",
  //         icon: CircleHelp,
  //         url: "#",
  //       },
  //       {
  //         title: "Todo",
  //         icon: Circle,
  //         url: "#",
  //       },
  //       {
  //         title: "In Progres",
  //         icon: Clock,
  //         url: "#",
  //       },
  //       {
  //         title: "Done",
  //         icon: CircleCheck,
  //         url: "#",
  //       },
  //       {
  //         title: "Canceled",
  //         icon: CircleX,
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Website",
  //     url: "#",
  //     icon: MonitorSmartphone,
  //     items: [
  //       {
  //         title: "Backlog",
  //         icon: CircleHelp,
  //         url: "#",
  //       },
  //       {
  //         title: "Todo",
  //         icon: Circle,
  //         url: "#",
  //       },
  //       {
  //         title: "In Progres",
  //         icon: Clock,
  //         url: "#",
  //       },
  //       {
  //         title: "Done",
  //         icon: CircleCheck,
  //         url: "#",
  //       },
  //       {
  //         title: "Canceled",
  //         icon: CircleX,
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Mobile",
  //     url: "#",
  //     icon: Smartphone,
  //     items: [
  //       {
  //         title: "Backlog",
  //         icon: CircleHelp,
  //         url: "#",
  //       },
  //       {
  //         title: "Todo",
  //         icon: Circle,
  //         url: "#",
  //       },
  //       {
  //         title: "In Progres",
  //         icon: Clock,
  //         url: "#",
  //       },
  //       {
  //         title: "Done",
  //         icon: CircleCheck,
  //         url: "#",
  //       },
  //       {
  //         title: "Canceled",
  //         icon: CircleX,
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  others: [
    {
      name: "Teams",
      url: "#",
      icon: Users,
    },
    {
      name: "Biling",
      url: "#",
      icon: CreditCard,
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="bg-zinc-950" collapsible="icon" {...props}>
      <SidebarHeader className="border-b h-16 flex items-center justify-center">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavItemLink title="Platform Content" items={data.platform} />
        {/* <NavMain title="Projects" items={data.projects} /> */}
        <NavItemLink title="Others" items={data.others} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
