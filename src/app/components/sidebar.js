import * as React from "react";

import { SearchForm } from "@/shadcomponents/ui/search-form";
import { VersionSwitcher } from "@/shadcomponents/ui/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/shadcomponents/ui/sidebar";

import { Library } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { MessageCircle } from 'lucide-react';
import { Microscope } from 'lucide-react';
import { Book } from 'lucide-react';


const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Research",
          url: "#",
          icon: <Library />,
        },
        {
          title: "Dashboard",
          url: "#",
          icon: <LayoutDashboard />,
        },
        {
            title: "Interview Preparation",
            url: "#",
            icon: <MessageCircle />, // Resuse the kanban but list all of the interview stage ones that will be moved from kanban completed to interview and let them generate 
          },
          {
            title: "Paid Research Funding",
            url: "#",
            icon: <Microscope />,
          },
          {
            title: "Tips",
            url: "#",
            icon: <Book />,
          },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar className="font-sans" {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="font-sans">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="font-light"
                      asChild
                      isActive={item.isActive}
                    >
                      <a href={item.url}>
                        {" "}
                        {item.icon}
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
