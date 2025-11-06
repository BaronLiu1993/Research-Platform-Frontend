import { cookies } from "next/headers";
import Link from "next/link";

import generateColumns from "../components/drafts/columns";
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
import { Laptop, MapIcon, Pen, PlaneLanding, Workflow } from "lucide-react";
import { Badge } from "@/shadcomponents/ui/badge";
import { DraftsTable } from "../components/drafts/draft-table";

export default async function Workspace({ searchParams }) {
  const cookieStore = cookies();
  const access = cookieStore.get("access_token")?.value;
  const pageNumber = Number(searchParams?.page ?? 1) || 1;

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

  const draftsFetchOpts = {
    method: "GET",
    headers: access ? { Authorization: `Bearer ${access}` } : {},
  };

  let draftsData = [];
  let parsedUserProfile = {};

  try {
    const [profileRes, draftsRes] = await Promise.all([
      fetch(`${API_BASE}/auth/get-user-sidebar-info`, profileFetchOpts),
      fetch(`${API_BASE}/email/get-drafts`, draftsFetchOpts),
    ]);

    if (profileRes.ok) {
      parsedUserProfile = await profileRes.json();
    }

    if (draftsRes.ok) {
      draftsData = await draftsRes.json();
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
                      href="/"
                      className="font-main text-sm flex items-center hover:underline gap-2 font-light text-[#37352F]"
                    >
                      <Laptop className="h-5 w-5 text-blue-700" />
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-main flex cursor-pointer items-center hover:underline gap-2 font-light text-[#37352F]">
                    <Pen className="h-5 w-5 text-blue-700" />
                    Drafts
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
                      Drafts
                    </h1>
                  </div>
                  <div className="flex items-center py-2 gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-[#F1F1EF] text-[#37352F] rounded-md text-[11px]"
                    >
                      <PlaneLanding className="w-3.5 h-3.5 mr-1" />
                      Send Your Drafts!
                    </Badge>
                  </div>
                  <div>
                    <div className="my-5">
                      <h1 className="text-xs bg-[#FAEBDD] text-[#D9730D] w-fit py-1 px-2 font-main">
                        How To Send Emails
                      </h1>
                      <div className="flex py-3">
                        <div className="w-1 h-full bg-gray-100"></div>
                        <div>
                          <ol className="font-main text-xs">
                            <li>
                              1. Click
                              <span className="text-blue-800 p-1 bg-gray-100 rounded-lg">
                              edit draft button
                              </span>{" "}
                              to check what you are sending
                            </li>
                            <li>2. Double check emails before sending</li>
                            <li>
                              3. Use{" "}
                              <span className="text-blue-800">checkboxes</span>{" "}
                              to select your desired professor to send to
                            </li>
                            <li>
                              4. Click <span className="text-blue-800">Send Button</span> to{" "}
                              <span className="text-blue-800">drafts</span> tab
                            </li>
                            <li>
                              5. Check <span className="text-blue-800">Emails</span> and <span className="text-blue-800">Read Receipts</span> to{" "}
                              <span className="text-blue-800">drafts</span> tab
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-8 overflow-x-auto">
                  <DraftsTable
                    generateColumns={generateColumns}
                    data={draftsData.data}
                    pageNumber={pageNumber}
                    access={access}
                    userName={parsedUserProfile.student_name}
                    userEmail={parsedUserProfile.student_email}
                  />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
