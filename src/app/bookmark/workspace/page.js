"use server";

import { cookies } from "next/headers";
import Workspace from "@/app/components/bookmark/workspace";
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
import { redirect } from "next/navigation";

export default async function Work() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const access = cookieStore.get("access_token")?.value;

  const [
    rawSavedData,
    rawInProgressData,
    rawDraftData,
    rawCompletedData,
    rawUserProfile,
    rawResumeData,
    rawTranscriptData,
  ] = await Promise.all([
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
    fetch(`http://localhost:8080/inprogress/fetch/draft`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }),
    fetch(`http://localhost:8080/completed/workspace/completed-data`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }),
    fetch("http://localhost:8080/auth/get-user-sidebar-info", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
    }),
    fetch(`http://localhost:8080/storage/get-resume`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }),
    fetch(`http://localhost:8080/storage/get-transcript`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }),
  ]);

  const [
    savedDataJson,
    inProgressJson,
    draftJson,
    completedJson,
    userProfileJson,
    resumeData,
    transcriptData,
  ] = await Promise.all([
    rawSavedData.json(),
    rawInProgressData.json(),
    rawDraftData.json(),
    rawCompletedData.json(),
    rawUserProfile.json(),
    rawResumeData.json(),
    rawTranscriptData.json(),
  ]);

  const parsedInProgressData = inProgressJson?.data ?? [];
  const parsedSavedData = savedDataJson?.data ?? [];
  const parsedDraftData = draftJson?.data ?? [];
  const parsedCompletedData = completedJson?.data ?? [];
  const parsedUserProfile = userProfileJson ?? {};
  const parsedResumeData = resumeData ?? {};
  const parsedTranscriptData = transcriptData ?? {};
  let draftData = await Promise.all(
    (parsedDraftData ?? []).map(async (prof) => {
      try {
        const rawDraftResults = await fetch(
          `http://localhost:8080/draft/resume-draft/${prof.draft_id}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        const parsedDraftResults = await rawDraftResults.json();
        if (parsedDraftResults?.draftExists) {
          return {
            id: prof.id,
            draftId: prof.draft_id,
            name: prof.name,
            email: prof.email,
            ...parsedDraftResults,
          };
        }
      } catch {
        redirect("/repository");
      }
    })
  );

  draftData = draftData.filter(Boolean);
  return (
    <SidebarProvider>
      <AppSidebar student_data={parsedUserProfile} />
      <SidebarInset>
        <header className="flex h-8 shrink-0 items-center gap-2 px-6">
          <SidebarTrigger className="cursor-pointer" />
          <Breadcrumb className="font-main font-semibold">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block hover:underline cursor-pointer">
                <BreadcrumbLink
                  href="/"
                  className="font-main flex items-center gap-2 font-light text-[#37352F]"
                >
                  <Laptop className="rounded-xs text-white fill-blue-700 h-5 w-5" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <div className="text-gray-300">/</div>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-main flex items-center gap-2 font-light text-[#37352F]">
                  <MapIcon className="fill-blue-700 text-white" />
                  Application Tracker
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 overflow-y-auto font-main">
          <div className="w-full flex p-6 space-x-6">
            <Workspace
              userId={userId}
              access={access}
              parsedInProgressData={parsedInProgressData}
              parsedCompletedData={parsedCompletedData}
              initialDraftData={draftData}
              parsedUserProfile={parsedUserProfile}
              parsedSavedData={parsedSavedData}
              parsedResumeData={parsedResumeData}
              parsedTranscriptData={parsedTranscriptData}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
