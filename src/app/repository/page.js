"use server";

import { cookies } from "next/headers";

import { Separator } from "@/shadcomponents/ui/separator";
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

export default async function Repository() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id");
  const serverData = await fetch("http://localhost:8080/Taishan/");
  const parsedResponse = await serverData.json();
  const responses = parsedResponse.data;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className="font-inter font-semibold">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-inter font-semibold">
                  Professors
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 overflow-y-auto font-inter">
          <div className="flex flex-col">
            <div className="border-b-1 space-y-2">
              <div className="bg-neutral-100 mx-9 rounded-xs mt-2">
                <h1 className="text-xl text-neutral-700 font-semibold px-6 pt-6">
                  You Might Be Interested In...
                </h1>
                <p className="text-neutral-500 font-semibold text-sm px-6 pb-6">
                  Based on the topics you've been exploring, we've handpicked a
                  set of insightful suggestions that closely align with your
                  current research interests. 
                </p>
              </div>{" "}
              <div className="flex">
                <SearchForm className="font-inter px-7 w-[30rem]" />
                <FilterRecommendations />
              </div>
              <Recommendations />
            </div>
            <div className="border-b-1 space-y-2">
              <h1 className="text-xl text-neutral-700 font-semibold px-6 pt-6">
                Discover Professors at Uoft!
              </h1>
              <p className="text-neutral-500 px-6 pb-6 font-normal">
                Browse through faculty members across departments, explore their
                research interests, and find the perfect mentor <br /> for your
                academic journey. Start connecting with UofT professors today!
              </p>{" "}
              
            </div>
            <div className="mt-4">
              <DataTable
                generateColumns={generateColumns}
                data={responses}
                userId={userId.value}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
