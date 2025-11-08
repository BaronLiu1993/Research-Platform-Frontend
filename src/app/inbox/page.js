import { cookies } from "next/headers";
import Link from "next/link";

import generateColumns from "../components/inbox/columns";

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
import { InboxIcon, Laptop, Send } from "lucide-react";
import { InboxTable } from "../components/inbox/inbox-table";
import { Badge } from "@/shadcomponents/ui/badge";

export default async function Inbox({ searchParams }) {
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

  const inboxFetchOpts = {
    method: "GET",
    headers: access ? { Authorization: `Bearer ${access}` } : {},
  };

  let parsedUserProfile = {};
  let inboxThreads = [];
  try {
    const [profileRes, inboxRes] = await Promise.all([
      fetch(`${API_BASE}/auth/get-user-sidebar-info`, profileFetchOpts),
      fetch(`${API_BASE}/inbox/get-threads?page=${pageNumber}`, inboxFetchOpts),
    ]);

    if (profileRes.ok) {
      parsedUserProfile = await profileRes.json();
    }

    if (inboxRes.ok) {
      inboxThreads = await inboxRes.json();
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
                    <InboxIcon className="h-5 w-5 text-blue-700" />
                    Inbox
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
                      Inbox
                    </h1>
                  </div>

                  <div className="flex items-center py-2 gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-[#F1F1EF] text-[#37352F] rounded-md text-[11px]"
                    >
                      <Send className="w-3.5 h-3.5 mr-1" />
                      View Professor Threads
                    </Badge>
                  </div>
                </div>

                <div className="mb-8 overflow-x-auto">
                  <InboxTable
                    data={inboxThreads.data}
                    generateColumns={generateColumns}
                    access={access}
                    pageNumber={pageNumber}
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
