"use client";

import { useState } from "react";
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

import {
  ChevronDown,
  Library,
  LayoutDashboard,
  Microscope,
  Inbox,
  Settings,
} from "lucide-react";

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
          icon: (
            <Inbox className="text-red-500 bg-red-100 h-6 w-6 p-0.5 rounded-xs" />
          ),
        },
        {
          title: "Dashboard",
          type: "expandable", 
          icon: (
            <LayoutDashboard className="h-6 w-6 bg-blue-100 rounded-xs text-[#337EA9] p-0.5" />
          ),
          options: [
            { title: "Workspace", url: "/bookmark/workspace" },
            { title: "Kanban", url: "/bookmark/kanban" },
          ],
        },
        {
          title: "Research Fund",
          url: "/grants",
          icon: (
            <Microscope className="text-purple-500 bg-purple-100 h-6 w-6 p-0.5 rounded-xs" />
          ),
        },
        {
          title: "Settings",
          url: "/dashboard",
          icon: (
            <Settings className="text-zinc-500 bg-zinc-100 h-6 w-6 p-0.5 rounded-xs" />
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
            <h1 className="text-sm font-medium">
              {student_data.student_name}
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

                      {expanded === itm.title && (
                        <div className="m-2 border-gray-200">
                          {itm.options.map((opt) => (
                            <a
                              key={opt.title}
                              href={opt.url}
                              className="block text-[#787774] text-[12.5px] font-[500] pl-3 font-main pr-2 py-1 hover:bg-gray-100 rounded-sm transition"
                            >
                              {opt.title}
                            </a>
                          ))}
                        </div>
                      )}
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
    </Sidebar>
  );
}
