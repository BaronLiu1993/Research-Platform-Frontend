"use server";

import { cookies } from "next/headers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcomponents/ui/breadcrumb";

import Email from "../components/email/email";
import {
  Laptop,
  Mail,
  MapIcon,
  MoveLeft,
  MoveRight,
  PencilLineIcon,
  PersonStandingIcon,
  Plug,
  Plus,
} from "lucide-react";
import { parse } from "date-fns";

export default async function email({ searchParams }) {
  //Get SearchParams
  const professorId = (await searchParams).id;
  const professorName = (await searchParams).name || "Recipient Name";
  const professorEmail = (await searchParams).email || "recipient@example.com";
  const professorResearchInterests = (await searchParams).professor_interests;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const cookieStore = await cookies();
  const access = cookieStore.get("access_token");
  const studentData = await fetch(
    "http://localhost:8080/auth/get-user-id-email",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access.value}`,
        "Content-Type": "application/json",
      },
    }
  );
  const parsedStudentData = await studentData.json();
  //Check If there is already a draft
  //If there is then push the prop down, if there is none then do nothing
  
  const draftData = await fetch(`http://localhost:8080/gmail/resume-draft/${parsedStudentData.user_id}/${professorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const parsedDraftData = await draftData.json()
  

  return (
    <>
      <header className="flex h-8 shrink-0 items-center gap-2 px-6">
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
                <PersonStandingIcon className="text-blue-700" />
                Eldan Cohen
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <div className="text-gray-300">/</div>
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
                <Mail className="text-blue-700 h-4 w-4" />
                Draft
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <Email
        student_data={parsedStudentData}
        professor_id={professorId}
        professor_name={professorName}
        professor_email={professorEmail}
        professor_interests={professorResearchInterests}
        timeZone={timeZone}
        draft_data = {parsedDraftData}
      />
    </>
  );
}
