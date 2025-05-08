"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

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

export default function email({ data }) {
  const searchParams = useSearchParams();
  const professor_interests_url = searchParams.get("professor_interests");
  const professor_information_url = searchParams.get("professor_information");

  const [resumeAttached, setResumeAttached] = useState("");
  const [userData, setUserData] = useState({
    student_email: "",
    student_major: "",
    student_research_interests: [],
  });

  const [professorData, setProfessorData] = useState({
    professor_email: "",
    professor_interests: [],
  });
  const [subjectWordContent, setSubjectWordContent] = useState("");
  const [bodyWordContent, setBodyWordContent] = useState("");

  useEffect(() => {
    console.log(professor_information_url);
    console.log(professor_interests_url);
    setProfessorData({
      professor_email: professor_information_url,
      professor_interests: professor_interests_url,
    });
    console.log(professorData);
  }, []);

  // Create Personalised Email and Send Also Automate the Sending Here
  // Attach Transcript and Resume Here
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
          <Email />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
