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

import { ChevronsUpDown, ChevronRight, Languages, Settings } from "lucide-react";
import { Library } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Microscope } from "lucide-react";
import { Book } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Research",
          url: "/repository",
          icon: <Library className = "h-5 w-5"/>,
        },
        {
          title: "Dashboard",
          url: "/bookmark",
          icon: <LayoutDashboard className = "h-5 w-5"/>,
        },
        {
          title: "Interview Preparation",
          url: "#",
          icon: <MessageCircle className = "h-5 w-5"/>, // Resuse the kanban but list all of the interview stage ones that will be moved from kanban completed to interview and let them generate
        },
        {
          title: "Paid Research Funding",
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
    <Sidebar className="font-inter" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent className="font-inter">
        {data.navMain.map((item) => (
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
                        <span className="text-neutral-500">
                          {item.icon}
                        </span>
                        <span className="font-semibold text-neutral-500 text-[13.5px]">
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
      <SidebarContent></SidebarContent>
      <SidebarFooter className="mb-10">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between font-semibold text-neutral-400"
            >
              <Languages className="text-neutral-400" />
              {value
                ? languages.find((lang) => lang.value === value)?.label
                : "Select Language..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
