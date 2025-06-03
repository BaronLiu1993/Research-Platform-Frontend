"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Builder from "@/app/components/resume/builder";

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


import { Separator } from "@/shadcomponents/ui/separator";
import { Laptop, MapIcon, MoveLeft, MoveRight, PencilLineIcon, PersonStanding, PersonStandingIcon, Plus, Sheet } from "lucide-react";

export default function resume() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const research_interests = searchParams.getAll("research_interests");
  const professor_name = searchParams.get("professor_name");
  const professor_email = searchParams.get("professor_email");
  const professor_id = searchParams.get("professor_id");

  const handleSendDataToEmail = (url) => {
    router.push(
      `/email?url=${encodeURIComponent(
        url
      )}&professor_interests=${encodeURIComponent(
        research_interests
      )}&name=${encodeURIComponent(professor_name)}&email=${encodeURIComponent(
        professor_email
      )}&id=${encodeURIComponent(professor_id)}`
    );
  };

  return (
    <>
      <SidebarProvider>
        <SidebarInset>
        <header className="flex h-8 shrink-0 items-center gap-2 px-6">
          <SidebarTrigger className = "cursor-pointer"/>
          <Breadcrumb className="font-main font-semibold">
            <BreadcrumbList>
              <BreadcrumbItem>
                <MoveLeft className="w-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <MoveRight className="w-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Plus className="w-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
              </BreadcrumbItem>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="/"
                  className="flex items-center font-medium text-[#37352F] gap-2"
                >
                  <Laptop className="rounded-xs text-white fill-blue-700 h-5 w-5" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <div className="text-gray-300">/</div>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
                  <MapIcon className="fill-blue-700 text-white" />
                  Professors
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <div className="text-gray-300">/</div>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
                  <PencilLineIcon className="fill-blue-700 text-white" />
                  Resume
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <div className="text-gray-300">/</div>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
                  <PersonStandingIcon className= "text-blue-700" />
                  Eldan Cohen
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
          <div className=" space-x-2 select-none bg-gray-100">
            <Builder researchInterests={research_interests} />
          </div>
          <button onClick={handleSendDataToEmail}>Email Page</button>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
