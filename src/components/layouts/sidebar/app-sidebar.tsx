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
  User,
  Users,
  Pickaxe,
  Handshake,
  Workflow,
  MessageCircleHeart,
  Origami,
  HandCoins,
} from "lucide-react";

// import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/layouts/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavItem } from "./nav-item";

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
      name: "Produk",
      url: "/dashboard/product",
      icon: Server,
    },
    {
      name: "Penawaran",
      url: "/dashboard/pricing",
      icon: HandCoins,
    },
    {
      name: "Pelayanan",
      url: "/dashboard/service",
      icon: Pickaxe,
    },
    {
      name: "Tanya Jawab",
      url: "/dashboard/faq",
      icon: MessageSquareQuote,
    },
    {
      name: "Partner",
      url: "/dashboard/client",
      icon: Handshake,
    },
    {
      name: "Alur Kerja",
      url: "/dashboard/workflow",
      icon: Workflow,
    },
    {
      name: "Testimoni",
      url: "/dashboard/testimonial",
      icon: MessageCircleHeart,
    },
    {
      name: "Portofolio",
      url: "/dashboard/portofolio",
      icon: Origami,
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
      name: "Akun",
      url: "/dashboard/profile",
      icon: User,
    },
    {
      name: "Member",
      url: "/dashboard/teams",
      icon: Users,
    },
    {
      name: "Pengaturan",
      url: "/dashboard/setting",
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
        <NavItem title="Menu CMS" items={data.platform} />
        {/* <NavMain title="Projects" items={data.projects} /> */}
        <NavItem title="Lainnya" items={data.others} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
