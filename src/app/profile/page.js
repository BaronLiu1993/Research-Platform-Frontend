import { cookies } from "next/headers";
import Link from "next/link";

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

import { AppSidebar } from "../components/sidebar";
import { Laptop, PersonStanding, PlaneLanding } from "lucide-react";
import { Badge } from "@/shadcomponents/ui/badge";
import Dashboard from "../components/profile/dashboard";

export default async function Profile({ searchParams }) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access_token")?.value;
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  const profileFetchOpts = {
    headers: access
      ? {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        }
      : {},
    cache: "no-store",
  };

  const fileFetchOpts = {
    method: "GET",
    headers: access ? { Authorization: `Bearer ${access}` } : {},
  };

  let parsedUserProfile = {};
  let profileData = {}
  let fileExists = {};

  try {
    const [fileRes, profileRes, profileDataRes] = await Promise.all([
      fetch(`${API_BASE}/storage/check-file-existance`, fileFetchOpts),
      fetch(`${API_BASE}/auth/get-user-sidebar-info`, profileFetchOpts),
      fetch(`${API_BASE}/auth/fetch-info`, profileFetchOpts)
    ]);

    // This could be done in parallel change later

    if (fileRes.ok) {
      fileExists = await fileRes.json();
    }

    if (profileDataRes.ok) {
      profileData = await profileDataRes.json();
    }

    if (profileRes.ok) {
      parsedUserProfile = await profileRes.json();
    }
  } catch {
    //log with telemetry
  }

  return (
    <div className="w-full overflow-hidden">
      <SidebarProvider>
        <AppSidebar student_data={parsedUserProfile} />
        <SidebarInset className="flex flex-col min-h-0 overflow-hidden">
          <header className="sticky top-0 z-10 flex h-10 shrink-0 items-center gap-2 px-4 sm:px-6 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50">
            <SidebarTrigger className="cursor-pointer" />
            <Breadcrumb className="font-main font-semibold">
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link
                      href="/repository"
                      className="font-main flex items-center hover:underline gap-2 font-medium text-xs text-[#37352F]"
                    >
                      <Laptop className="h-5 w-5 text-[#5AC2FF]" />
                      Repository
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-main flex cursor-pointer items-center hover:underline gap-2 font-medium text-xs text-[#37352F]">
                    <PersonStanding className="h-5 w-5 text-[#5AC2FF]" />
                    Profile
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex-1 overflow-y-auto overflow-x-hidden font-main">
            <div className="w-full max-w-screen-xl px-4 sm:px-6">
              <div className="my-8 sm:my-10 space-y-2">
                <div className="mt-2 mx-6">
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <h1 className="text-xl sm:text-2xl text-[#37352F] font-semibold">
                      Profile
                    </h1>
                  </div>
                  <div className="flex items-center py-2 gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-[#F1F1EF] text-[#37352F] rounded-md text-[11px]"
                    >
                      <PlaneLanding className="w-3.5 h-3.5 mr-1" />
                      Change Your Profile!
                    </Badge>
                  </div>
                </div>
                <div className="mb-8 overflow-x-auto">
                  <Dashboard access={access} fileExists = {fileExists} profileData={profileData}/>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
