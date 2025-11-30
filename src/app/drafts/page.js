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

export default async function Drafts({ searchParams }) {
  const cookieStore = await cookies();
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
                      href="/repository"
                      className="font-main font-medium text-xs flex items-center hover:underline gap-2 text-[#37352F]"
                    >
                      <Laptop className="h-5 w-5 text-blue-700" />
                      Repository
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-main flex font-medium text-xs cursor-pointer items-center hover:underline gap-2 text-[#37352F]">
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
                    <div className="mt-5">
                      <div className="inline-flex items-center rounded-md bg-[#FAEBDD] px-2 py-0.5 text-[11px] font-main font-medium text-[#D9730D]">
                        How To Send Emails
                      </div>

                      <div className="mt-2 flex gap-2">
                        <div className="flex-1">
                          <ol className="list-decimal pl-4 space-y-1 font-main text-[13px] text-[#37352F] marker:text-slate-400">
                            <li className="leading-5">
                              Click{" "}
                              <span className="rounded bg-slate-100 px-1 py-0.5 text-blue-700">
                                edit draft
                              </span>{" "}
                              {"to review what you’re sending"}
                            </li>
                            <li className="leading-5">
                              Double-check emails before sending
                            </li>
                            <li className="leading-5">
                              Use{" "}
                              <span className="text-blue-700">checkboxes</span>{" "}
                              to select professors to send to
                            </li>
                            <li className="leading-5">
                              Click the{" "}
                              <span className="text-blue-700">Send</span> button
                            </li>
                            <li className="leading-5">
                              Check{" "}
                              <span className="text-blue-700">Emails</span> and{" "}
                              <span className="text-blue-700">
                                Read Receipts
                              </span>{" "}
                              for status
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
