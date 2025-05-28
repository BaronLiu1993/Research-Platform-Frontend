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

import { ChevronsUpDown, ChevronRight, Languages } from "lucide-react";
import { Library } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Microscope } from "lucide-react";
import { Book } from "lucide-react";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Research",
          url: "/repository",
          icon: <Library />,
        },
        {
          title: "Dashboard",
          url: "/dashboard",
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
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent className="font-inter">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-sm text-neutral-400">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>
                        {" "}
                        <span className = "text-neutral-500"> {item.icon}</span>
                        <span className = "font-semibold text-neutral-500"> {item.title}</span>
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
              className="w-[200px] justify-between font-light"
            >
              <Languages className="text-gray-400" />
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
