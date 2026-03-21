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
  Pen,
  PersonStanding,
  LetterText,
  Mail,
} from "lucide-react";
import { Button } from "@/shadcomponents/ui/button";
import { featureFlags } from "@/lib/featureFlags";

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
        ...(featureFlags.emailFlow
          ? [
              {
                title: "Drafts",
                url: "/drafts",
                icon: (
                  <Pen className="h-6 w-6 bg-gray-200 rounded-xs text-gray-600 p-1" />
                ),
              },
              {
                title: "Inbox",
                url: "/inbox",
                icon: (
                  <Mail className="h-6 w-6 bg-purple-100 rounded-xs text-purple-400 p-1" />
                ),
              },
            ]
          : []),
        {
          title: "Profile",
          url: "/profile",
          icon: (
            <PersonStanding className="h-6 w-6 bg-[#EDF3EC] rounded-xs text-[#448361] p-0.5" />
          ),
        },
      ],
    },
  ],
};

export function AppSidebar({ student_data, ...props }) {
  const [expanded, setExpanded] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Sidebar className="w-[12rem] font-main" {...props}>
      <SidebarHeader className="font-main rounded-sm m-2">
        <div className="flex items-center gap-2">
          <div className="min-w-0">
            <h1 className="text-sm font-medium truncate">{student_data.student_name.length > 25 ? student_data.student_name.slice(0, 25) + '...' : student_data.student_name}</h1>
            <p className="text-xs truncate">
              {student_data.student_email.length > 30 ? student_data.student_email.slice(0, 30) + '...' : student_data.student_email}
            </p>
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
          disabled={isLoading}
          onClick={async () => {
            try {
              setIsLoading(true);
              localStorage.clear();
              sessionStorage.clear();
              await LogOut();
            } finally {
              setIsLoading(false);
            }
          }}
          className="w-fit text-xs p-2 text-white bg-[#D44C47] hover:bg-red-500 disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-600 disabled:hover:bg-gray-300 cursor-pointer"
        >
          {isLoading ? "Signing Out..." : "Sign Out"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
