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
import { Laptop, MapIcon } from "lucide-react";

export default async function Workspace() {
  const cookieStore = cookies();
  const access = cookieStore.get("access_token")?.value;
  const userId = cookieStore.get("user_id")?.value;

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

  const savedFetchOpts = {
    method: "GET",
    headers: access ? { Authorization: `Bearer ${access}` } : {},
    next: { revalidate: 600 },
  };

  let savedIds = [];
  let parsedUserProfile = {};

  try {
    const [profileRes, savedRes] = await Promise.all([
      fetch(`${API_BASE}/auth/get-user-sidebar-info`, profileFetchOpts),
      fetch(`${API_BASE}/saved/repository/get-saved`, savedFetchOpts),
    ]);

    if (profileRes.ok) {
      parsedUserProfile = await profileRes.json();
    }

    if (savedRes.ok) {
      savedIds = await savedRes.json();
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
                    <MapIcon className="h-5 w-5 text-blue-700" />
                    Workspace
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
