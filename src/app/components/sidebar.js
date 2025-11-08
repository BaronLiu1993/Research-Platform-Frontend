"use client";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/shadcomponents/ui/sidebar";

import { LogOut } from "../api/logout/logout";

import {
  ChevronDown,
  Library,
  LayoutDashboard,
  Inbox,
  InboxIcon,
  Pen,
} from "lucide-react";
import { Button } from "@/shadcomponents/ui/button";

const data = {
  navMain: [
    {
      title: "Workflows",
      url: "#",
      items: [
        {
          title: "Repository",
          url: "/repository",
          icon: (
            <Library className="h-6 w-6 bg-orange-100 rounded-xs text-orange-500 p-0.5" />
          ),
        },
        {
          title: "Saved",
          url: "/workspace",
          icon: (
            <LayoutDashboard className="h-6 w-6 bg-blue-100 rounded-xs text-[#337EA9] p-0.5" />
          ),
        },
        {
          title: "Drafts",
          url: "/drafts",
          icon: (
            <Pen className="h-6 w-6 bg-[#F6F3F9] rounded-xs text-[#9065B0] p-0.5" />
          ),
        },
        {
          title: "Inbox",
          url: "/inbox",
          icon: (
            <InboxIcon className="h-6 w-6 bg-red-100 rounded-xs text-[#a23423] p-0.5" />
          ),
        },
      ],
    },
  ],
};

export function AppSidebar({ student_data, ...props }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <Sidebar className="w-[12rem] font-main" {...props}>
      <SidebarHeader className="font-main rounded-sm m-2">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-sm font-medium">{student_data.student_name}</h1>
            <p className="text-xs">{student_data.student_email.slice(0, 25)}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-[12px]">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((itm) =>
                  itm.type === "expandable" ? (
                    <SidebarMenuItem key={itm.title}>
                      <SidebarMenuButton
                        onClick={() =>
                          setExpanded(expanded === itm.title ? null : itm.title)
                        }
                        className="flex items-center gap-1 font-main"
                      >
                        <span className="text-[#787774] text-[12.5px]">
                          {itm.icon}
                        </span>
                        <span className="text-[#787774] text-[12.5px] font-[500]">
                          {itm.title}
                        </span>
                        <ChevronDown
                          className={`ml-auto h-3 w-3 text-[#787774] transition-transform ${
                            expanded === itm.title ? "rotate-180" : ""
                          }`}
                        />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : (
                    <SidebarMenuItem key={itm.title}>
                      <SidebarMenuButton asChild isActive={itm.isActive}>
                        <a
                          href={itm.url}
                          className="flex items-center gap-1 font-main"
                        >
                          <span className="text-[#787774] text-[12.5px]">
                            {itm.icon}
                          </span>
                          <span className="text-[#787774] text-[12.5px] font-[500]">
                            {itm.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Button
          onClick={LogOut}
          className="w-fit text-xs p-2 text-white bg-[#D44C47] hover:bg-red-500 cursor-pointer"
        >
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
