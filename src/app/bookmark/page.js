"use server";

import { cookies } from "next/headers";
import Kanban from "../components/bookmark/kanban";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/shadcomponents/ui/sidebar";
import { AppSidebar } from "../components/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcomponents/ui/breadcrumb";
import { Laptop, MapIcon, MoveLeft, MoveRight, Plus } from "lucide-react";

export default async function Bookmark() {
  const cookieStore = await cookies();
  const raw_user_id = cookieStore.get("user_id");
  const user_id = raw_user_id.value;
  const access = cookieStore.get("access_token");
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

  const rawSavedData = await fetch(
    `http://localhost:8080/kanban/get-saved/${user_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const savedData = await rawSavedData.json();
  const parsedSavedData = savedData.data;

  const rawInProgressData = await fetch(
    `http://localhost:8080/kanban/get-in-progress/${user_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const inProgressData = await rawInProgressData.json();
  const parsedInProgressData = inProgressData.data;

  const draftData = await Promise.all(
    parsedInProgressData.map(async (prof) => {
      const rawDraftResults = await fetch(
        `http://localhost:8080/gmail/resume-draft/${user_id}/${prof.professor_id}`
      );
      const parsedDraftResults = await rawDraftResults.json();
      return {
        id: prof.id,
        name: prof.name,
        email: prof.email,
        ...parsedDraftResults,
      };
    })
  );

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
              userId={user_id}
              parsedInProgressData={parsedInProgressData}
              draftData={draftData}
              parsedUserProfile = {parsedUserProfile}
              parsedSavedData={parsedSavedData}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
