"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Kanban from "@/app/components/bookmark/kanban";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/shadcomponents/ui/sidebar";
import { AppSidebar } from "@/app/components/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcomponents/ui/breadcrumb";
import { Laptop, MapIcon, MoveLeft, MoveRight, Plus } from "lucide-react";

export default async function Board() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const access = cookieStore.get("access_token")?.value;

  const [rawSavedData, rawInProgressData, rawCompletedData, rawUserProfile] =
    await Promise.all([
      fetch(`http://localhost:8080/saved/kanban/get-saved`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }),
      fetch(`http://localhost:8080/inprogress/kanban/get-in-progress`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }),
      fetch(`http://localhost:8080/completed/kanban/get-completed`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }),
      fetch("http://localhost:8080/auth/get-user-sidebar-info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }),
    ]);

  const [savedDataJson, inProgressJson, completedJson, userProfileJson] =
    await Promise.all([
      rawSavedData.json(),
      rawInProgressData.json(),
      rawCompletedData.json(),
      rawUserProfile.json(),
    ]);

  const parsedInProgressData = inProgressJson?.data ?? [];
  const parsedSavedData = savedDataJson?.data ?? [];
  const parsedCompletedData = completedJson?.data ?? [];
  const parsedUserProfile = userProfileJson ?? {};

  return (
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
              <BreadcrumbItem className="hidden md:block hover:underline cursor-pointer">
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
                <BreadcrumbPage className="font-main flex items-center hover:underline cursor-pointer gap-2 font-medium text-[#37352F]">
                  <MapIcon className="fill-blue-700 text-white" />
                  Application Tracker
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 overflow-y-auto font-main">
          <div className="w-full flex p-6 space-x-6">
            <Kanban
              userId={userId}
              parsedInProgressData={parsedInProgressData}
              parsedCompletedData={parsedCompletedData}
              parsedUserProfile={parsedUserProfile}
              parsedSavedData={parsedSavedData}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
