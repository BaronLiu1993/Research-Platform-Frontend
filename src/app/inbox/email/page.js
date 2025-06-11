"use server";

import { cookies } from "next/headers";
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

import {
  MoveLeft,
  MoveRight,
  Plus,
  Laptop,
  MapIcon,
  Mail,
  Inbox,
  Filter,
  ListFilter,
  RotateCw,
  FileSliders,
} from "lucide-react";

import InboxClientWrapper from "@/app/components/inbox/inboxclientwrapper";

export default async function InboxEmail() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id");
  const access = cookieStore.get("access_token");
  const emailResponse = await fetch(
    `http://localhost:8080/gmail/get-email-chain/${userId.value}`,
    {
      method: "GET",
    }
  );
  const parsedEmailResponse = await emailResponse.json();
  const threadArrayEmailResponse = parsedEmailResponse.threadArray;

  const rawUserProfile = await fetch(
    "http://localhost:8080/auth/get-user-sidebar-info",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access.value}`,
        "Content-Type": "application/json",
      },
    }
  );
  const parsedUserProfile = await rawUserProfile.json();
  console.log(parsedUserProfile.student_email)
  return (
    <>
      <SidebarProvider>
        <AppSidebar student_data={parsedUserProfile} />
        <SidebarInset>
          <header className="flex h-8 shrink-0 items-center gap-2 px-6">
            <SidebarTrigger className="cursor-pointer" />
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
                    <Mail className="fill-blue-700 text-white" />
                    Inbox
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <InboxClientWrapper emails = {parsedUserProfile.student_email} threadArrayEmailResponse = {threadArrayEmailResponse} userId = {userId.value}/>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
