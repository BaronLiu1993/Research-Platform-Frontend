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
import { MoveLeft, MoveRight, Plus, Laptop, MapIcon, Mail } from "lucide-react";
import InboxClientWrapper from "@/app/components/inbox/inboxclientwrapper";
import { redirect } from "next/navigation";

export default async function InboxEmail() {
  const cookieStore = cookies();
  const userId = cookieStore.get("user_id")?.value;
  const access = cookieStore.get("access_token")?.value;

  let threadArrayEmailResponse = [];

  const resp = await fetch(`http://localhost:8080/inbox/get-email-chain`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  if (resp.ok) {
    const parsedEmailResponse = await resp.json();
    threadArrayEmailResponse = parsedEmailResponse?.threadArray ?? [];
  }

  const combinedArray = await Promise.all(
    threadArrayEmailResponse.map(async (obj) => {
      try {
        const draftResp = await fetch(
          `http://localhost:8080/draft/resume-follow-up-draft/${encodeURIComponent(
            obj.professorId
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        const draftData = draftResp.ok ? await draftResp.json() : {};
        return { ...obj, draftData };
      } catch {
        return { ...obj, draftData: {} };
      }
    })
  );

  let parsedUserProfile = {};
  const authResp = await fetch(
    "http://localhost:8080/auth/get-user-sidebar-info",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  );
  if (authResp.ok) {
    parsedUserProfile = await authResp.json();
  }

  return (
    <SidebarProvider>
      <AppSidebar student_data={parsedUserProfile} />
      <SidebarInset>
        <header className="flex h-8 shrink-0 items-center gap-2 px-6">
          <SidebarTrigger className="cursor-pointer" />
          <Breadcrumb className="font-main font-semibold">
            <BreadcrumbList>
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

        <InboxClientWrapper
          emails={parsedUserProfile.student_email ?? ""}
          threadArrayEmailResponse={combinedArray}
          userId={userId}
          access={access}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
