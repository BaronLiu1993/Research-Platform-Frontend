"use client";

import { useState } from "react";

import { SearchForm } from "@/shadcomponents/ui/search-form";
import { VersionSwitcher } from "@/shadcomponents/ui/version-switcher";
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

import { Badge } from "@/shadcomponents/ui/badge";

import { Button } from "@/shadcomponents/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcomponents/ui/popover";
import { Separator } from "@/shadcomponents/ui/separator";

import { ChevronsUpDown, ChevronRight, Languages, Settings, Inbox, Send, SquarePen } from "lucide-react";
import { Library } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Microscope } from "lucide-react";
import { Book } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Research Suite",
      url: "#",
      items: [
        {
          title: "Product",
          url: "/repository",
          icon: <Library className = "h-6 w-6 bg-orange-100 rounded-xs text-orange-500 p-0.5"/>,
        },
        {
          title: "Dashboard",
          url: "/bookmark",
          icon: <LayoutDashboard className = "h-6 w-6 bg-blue-100 rounded-xs text-blue-500 p-0.5"/>,
        },
        {
          title: "Interview Prep",
          url: "#",
          icon: <MessageCircle className = "h-6 w-6 bg-green-100 rounded-xs text-green-500 p-0.5"/>, // Resuse the kanban but list all of the interview stage ones that will be moved from kanban completed to interview and let them generate
        },
        {
          title: "Research Fund",
          url: "#",
          icon: <Microscope className = "h-5 w-5"/>,
        },
        {
          title: "Tips",
          url: "#",
          icon: <Book className = "h-5 w-5"/>,
        },
        {
          title: "Settings",
          url: "/dashboard",
          icon: <Settings className = "h-5 w-5"/>,
        },
      ],
    },
  ],
  navTools: [
    {
      title: "Views",
      url: "#",
      items: [
        {
          title: "All Mail",
          url: "/repository",
          icon: <Inbox className = "h-5 w-5 text-red-400"/>,
        },
        {
          title: "Sent",
          url: "/bookmark",
          icon: <Send className = "h-5 w-5 text-indigo-500"/>,
        },
        {
          title: "Drafts",
          url: "#",
          icon: <SquarePen className = "h-5 w-5 text-teal-500"/>, // Resuse the kanban but list all of the interview stage ones that will be moved from kanban completed to interview and let them generate
        },
        {
          title: "Received",
          url: "#",
          icon: <Microscope className = "h-5 w-5"/>,
        },
      ],
    },
  ],
  
};

const languages = [
  { label: "中文", value: "ch" },
  { label: "한국어", value: "ko" },
  { label: "English", value: "en" },
];

export function AppSidebar({ ...props }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Sidebar className="w-[12rem] font-noto" {...props}>
      <SidebarHeader></SidebarHeader>
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
                      <a href={item.url} className="flex items-center gap-1">
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
      <SidebarContent className="">
        {data.navTools.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-[11px] text-neutral-400">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url} className="flex items-center gap-1">
                        <span className="text-neutral-400 text-[12.7px]">
                          {item.icon}
                        </span>
                        <span className=" text-neutral-500 text-[12.7px] font-[580]">
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
      
      <SidebarFooter className="mb-10">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[150px] justify-between font-semibold text-neutral-400 text-xs"
            >
              <Languages className="text-neutral-400" />
              {value
                ? languages.find((lang) => lang.value === value)?.label
                : "Select Language..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-2 space-y-1">
            <div className="p-2 text-xs font-semibold">Language</div>
            <Separator />

            {languages.map((lang) => (
              <Button
                key={lang.value}
                variant="ghost"
                className="w-full justify-between text-xs font-light cursor-pointer"
                onClick={() => {
                  setValue(lang.value);
                  setOpen(false);
                }}
              >
                {lang.label}
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
