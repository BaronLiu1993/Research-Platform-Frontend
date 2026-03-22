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
  SidebarTrigger,
} from "@/shadcomponents/ui/sidebar";
import { InboxIcon, Laptop, Mail } from "lucide-react";
import Thread from "@/app/components/inbox/thread";

export default async function Inbox({ searchParams }) {
  const cookieStore = await cookies();
  const sp = await searchParams;
  const access = cookieStore.get("access_token")?.value;
  const threadId = sp?.id || "";
  const name = sp?.name || "";
  const email = sp?.email || "";
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

  return (
    <>
          <header className="sticky top-0 z-10 flex h-10 shrink-0 items-center gap-2 px-4 sm:px-6 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50">
            <SidebarTrigger className="cursor-pointer text-black" />
            <div className="h-5 w-px bg-gray-300" />
            <Breadcrumb className="font-main font-semibold">
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link
                      href="/"
                      className="font-main font-medium text-xs flex items-center hover:underline gap-2 text-[#37352F]"
                    >
                      <Laptop className="h-5 w-5 text-black" />
                      Repository
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
                      <InboxIcon className="h-5 w-5 text-black" />
                      Inbox
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-main flex cursor-pointer items-center hover:underline gap-2 font-medium text-xs text-[#37352F]">
                    <Mail className="h-5 w-5 text-black" />
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
    </>
  );
}
