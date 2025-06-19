"use server";

import { cookies } from "next/headers";

import { SearchForm } from "@/shadcomponents/ui/search-form";
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
import generateColumns from "../components/repository/columns";
import { DataTable } from "../components/repository/data-table";
import Recommendations from "../components/repository/recommendations";
import FilterRecommendations from "./filterrecommendations";
import { Badge } from "@/shadcomponents/ui/badge";
import {
  Database,
  Laptop,
  List,
  MapIcon,
  MoveLeft,
  MoveRight,
  Plus,

} from "lucide-react";

export default async function Repository({ searchParams }) {
  const cookieStore = await cookies(); //Get Cookie
  const access = cookieStore.get("access_token");
  const userId = cookieStore.get("user_id"); //Get UserID
  const pageNumber = parseInt(searchParams?.page || "1")

  const tableData = await fetch(`http://localhost:8080/Taishan/?page=${pageNumber}`);
  const parsedTableData = await tableData.json();
  const rawUserProfile = await fetch("http://localhost:8080/auth/get-user-sidebar-info", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access.value}`,
      "Content-Type": "application/json",
    },
  });
  const parsedUserProfile = await rawUserProfile.json();

  return (
    <SidebarProvider>
      <AppSidebar student_data={parsedUserProfile}/>
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
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 overflow-y-auto font-main px-6">
          <div className="flex flex-col">
            <div className="my-10 space-y-2">
              <div className="rounded-xs mt-2">
                <div className="flex gap-2 pt-6">
                  <h1 className="text-2xl text-[#787774] font-semibold h-fit">
                    Curated Professors
                  </h1>
                </div>
                <div className="flex items-center py-2 space-x-2">
                  <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-xs text-[10px]">
                    <Database />
                    Data Engineering
                  </Badge>
                  <div className="rounded-full h-1 w-1 bg-[#37352F]"></div>
                  <h2 className="text-xs font-semibold text-[10px] text-[#37352F]">
                    By Jie Xuan Liu
                  </h2>
                </div>

                <div className="space-y-1 pt-6 pb-3">
                  {/* Removed px-6 from here */}
                  <p className="text-[#37352F] text-[13px] w-[55rem] font-light">
                    Based on your research interests, we’ve curated a set of{" "}
                    <span className="font-bold text-blue-700 font-mono">
                      personalized suggestions
                    </span>{" "}
                    that align closely with your current research interests.
                    Your{" "}
                    <span className="text-blue-700 font-bold font-mono">
                      research interests
                    </span>{" "}
                    are converted into vector representations, which are then
                    matched against each professor’s own{" "}
                    <span className="text-blue-700 font-bold font-mono">
                      research interests
                    </span>{" "}
                    using{" "}
                    <span className="underline text-blue-700 font-mono cursor-pointer">
                      cosine similarity scoring
                    </span>{" "}
                    [1].
                  </p>
                </div>
              </div>{" "}
              <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-xs text-[10px]">
                <Database />
                Recommended Professors
              </Badge>
              <div className="flex items-center">
                <SearchForm className="font-main min-w-[20rem]" />
                <FilterRecommendations />
              </div>
              <Recommendations />
            </div>

            <div className="mt-4">
              <DataTable
                generateColumns={generateColumns}
                data={parsedTableData.tableData}
                userId={userId.value}
                pageNumber={pageNumber}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
