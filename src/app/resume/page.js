"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";

import Builder from "../components/resume/builder";
import getProfessorData from "./resumeapi";
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

export default function resume({}) {
  const searchParams = useSearchParams();
  const search = searchParams.get("url");
  const router = useRouter();
  const [data, setData] = useState({});
  const [researchInterests, setResearchInterests] = useState({});
  const [professorEmail, setProfessorEmail] = useState({});
  const [professorName, setProfessorName] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const professor_url = search;
        const response = await getProfessorData({ url: professor_url });
        setData(response);
        setProfessorName(response.name);
        setProfessorEmail(response.email);
        setResearchInterests(response.research_interests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search]);

  const handleSendDataToEmail = (url) => {
    router.push(
      `/email?url=${encodeURIComponent(
        url
      )}&professor_interests=${encodeURIComponent(
        researchInterests
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
            
            <Builder researchInterests={data.research_interests} />
          </div>
          <button onClick={handleSendDataToEmail}>Email Page</button>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
