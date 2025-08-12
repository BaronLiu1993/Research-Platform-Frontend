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

import { Button } from "@/shadcomponents/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcomponents/ui/popover";
import { Separator } from "@/shadcomponents/ui/separator";

import {
  ChevronRight,
  Languages,
  Settings,
  Inbox,
  Send,
  SquarePen,
  ChevronDown,
} from "lucide-react";
import { Library } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Microscope } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Research Suite",
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
          title: "Inbox",
          url: "/inbox/email",
          icon: <Inbox className="text-red-500 bg-red-100 h-6 w-6 p-0.5 rounded-xs" />,
        },
        {
          title: "Dashboard",
          url: "/bookmark",
          icon: (
            <LayoutDashboard className="h-6 w-6 bg-blue-100 rounded-xs fill-[#337EA9] text-[#337EA9] p-0.5" />
          ),
        },
        {
          title: "Research Fund",
          url: "/grants",
          icon: <Microscope className="text-purple-500 bg-purple-100 h-6 w-6 p-0.5 rounded-xs" />,
        },
        {
          title: "Settings",
          url: "/dashboard",
          icon: <Settings className="text-zinc-500 bg-zinc-100 h-6 w-6 p-0.5 rounded-xs" />,
        },
        
      ],
    },
  ],
};

export function AppSidebar({ student_data, ...props }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Sidebar className="w-[12rem] font-main" {...props}>
      <SidebarHeader className="font-main rounded-sm m-2">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-sm font-medium">
              {student_data.student_firstname} {student_data.student_lastname}
            </h1>
            <p className="text-xs text-[#979A9B]">
              {student_data.student_email.slice(0, 20)}...
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-[11px] text-[#787774]">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url} className="flex items-center gap-1 font-main">
                        <span className="text-[#787774] text-[12.5px]">
                          {item.icon}
                        </span>
                        <span className=" text-[#787774] text-[12.5px] font-[500]">
                          {item.title}
                        </span>
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
