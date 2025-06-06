"use server"

import { cookies } from "next/headers";
import { Separator } from "@/shadcomponents/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcomponents/ui/breadcrumb";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/shadcomponents/ui/sidebar";

import { AppSidebar } from "@/app/components/sidebar";

import Email from "../components/email/email";
import { Laptop, Mail, MapIcon, MoveLeft, MoveRight, PencilLineIcon, PersonStandingIcon, Plug, Plus } from "lucide-react";

export default async function email() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access_token");
  const serverData = await fetch("http://localhost:8080/auth/get-user-id-email", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access.value}`,
      "Content-Type": "application/json",
    },
  });
  const responses = await serverData.json();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <SidebarProvider>
        <SidebarInset>
          <header className="flex h-8 shrink-0 items-center gap-2 px-6">
          <Breadcrumb className="font-main font-semibold">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <MoveLeft className="w-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <MoveRight className="w-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Plus className="w-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
                </BreadcrumbItem>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="/"
                    className="flex items-center font-medium text-[#37352F] gap-2"
                  >
                    <Laptop className="rounded-xs text-white fill-blue-700 h-5 w-5" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <div className="text-gray-300">/</div>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
                    <MapIcon className="fill-blue-700 text-white" />
                    Professors
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <div className="text-gray-300">/</div>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
                    <PencilLineIcon className="fill-blue-700 text-white" />
                    Resume
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <div className="text-gray-300">/</div>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
                    <PersonStandingIcon className="text-blue-700" />
                    Eldan Cohen
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <div className="text-gray-300">/</div>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
                    <Mail className="text-blue-700 h-4 w-4" />
                    Email
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <Email student_data = {responses} timeZone = {timeZone}/>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
