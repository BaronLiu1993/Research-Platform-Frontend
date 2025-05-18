"use client"

import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Builder from "@/app/components/resume/builder";
//Scans current resume for all keywords and then builds new resume with latex and the format given

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

export default function resume() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const research_interests = searchParams.getAll("research_interests")
  const handleSendDataToEmail = (url) => {
    router.push(
      `/email?url=${encodeURIComponent(
        url
      )}&professor_interests=${encodeURIComponent(
        research_interests
      )}&name=${encodeURIComponent(professorName)}&email=${encodeURIComponent(
        professorEmail
      )}`
    );
  };
  

  // Save a copy of the resume and then it will allow user to name it and that will be there resume for this one

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
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className=" space-x-2 select-none bg-gray-100">
            <Builder researchInterests={research_interests}/>
          </div>
          {/*<button onClick={handleSendDataToEmail}>Email Page</button>*/}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
