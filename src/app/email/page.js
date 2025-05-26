"use server"

import { cookies } from "next/headers";
import { Separator } from "@/shadcomponents/ui/separator";
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

import Email from "../components/email/email";

export default async function email() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access_token");
  const serverData = await fetch("http://localhost:8080/auth/get-user-id-email", {
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
                  <BreadcrumbPage>UofT Professors Repository</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Build Resume</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Construct Email</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <Email student_data = {responses} />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
