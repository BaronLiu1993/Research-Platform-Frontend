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

import { AppSidebar } from "@/app/components/sidebar";
import { InboxIcon, Laptop, Mail, MapIcon } from "lucide-react";
import Thread from "@/app/components/inbox/thread";

export default async function Inbox({ searchParams }) {
  const cookieStore = cookies();
  const access = cookieStore.get("access_token")?.value;
  const threadId = (await searchParams?.id) || "";
  const name = (await searchParams?.name) || "";
  const email = (await searchParams?.email) || "";
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
  let inboxEmails = [];
  try {
    const [profileRes, inboxRes] = await Promise.all([
      fetch(`${API_BASE}/auth/get-user-sidebar-info`, profileFetchOpts),
      fetch(
        `${API_BASE}/inbox/get-email-previews?threadId=${threadId}`,
        inboxFetchOpts
      ),
    ]);

    if (profileRes.ok) {
      parsedUserProfile = await profileRes.json();
    }

    if (inboxRes.ok) {
      inboxEmails = await inboxRes.json();
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
                      className="font-main font-medium text-xs flex items-center hover:underline gap-2 text-[#37352F]"
                    >
                      <Laptop className="h-5 w-5 text-[#5AC2FF]" />
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-main font-medium text-xs flex cursor-pointer items-center hover:underline gap-2 text-[#37352F]">
                    <Link
                      href="/inbox"
                      className="font-main font-medium text-xs flex items-center hover:underline gap-2 text-[#37352F]"
                    >
                      <InboxIcon className="h-5 w-5 text-[#5AC2FF]" />
                      Inbox
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-main flex cursor-pointer items-center hover:underline gap-2 font-medium text-xs text-[#37352F]">
                    <Mail className="h-5 w-5 text-[#5AC2FF]" />
                    Thread
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div>
            <Thread
              messageData={inboxEmails.messages}
              access={access}
              professorEmail={email}
              userEmail={parsedUserProfile.student_email}
              userName={parsedUserProfile.student_name}
              professorName={name}
            /> 
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
