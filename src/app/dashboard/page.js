import UserProfile from "./userprofile";
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

import { Separator } from "@/shadcomponents/ui/separator";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const access = cookieStore.get("accesstoken");
  const serverData = await fetch("http://localhost:8080/auth/get-user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access.value}`,
      "Content-Type": "application/json",
    },
  });
  const responses = await serverData.json();
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="font-sans">
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <UserProfile studentData={responses.profile} />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
