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
import { Badge } from "@/shadcomponents/ui/badge";
import { Database, House, Settings } from "lucide-react";

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
          <Breadcrumb className="font-noto font-semibold">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/" className="flex items-center gap-2">
                  <House className="h-4 w-4" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-noto font-semibold">
                  Professors
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 overflow-y-auto font-noto">
          <div className="flex flex-col">
          <Database />

            <div className="border-b-1 space-y-2">
              <div className="mx-9 rounded-xs mt-2">
                <div className="flex gap-2 px-6 pt-6">
                  <h1 className="text-xl text-neutral-700 font-semibold h-fit">
                    Curated Professors
                  </h1>
                </div>
                <div className="flex items-center px-6 py-2 space-x-2">
                  <Badge className="bg-[#eeeeee] text-neutral-700 rounded-xs text-[10px]">
                    <Database />
                    Data Engineering
                  </Badge>
                  <div className="rounded-full h-1 w-1 bg-neutral-600"></div>
                  <h2 className="text-xs font-semibold text-[10px]">
                    By Jie Xuan Liu
                  </h2>
                </div>

                <div className="space-y-1 pt-6 pb-3">
                  <p className="text-neutral-400 text-[13px] px-6 w-[60rem] font-semibold">
                    Based on your research interests, we’ve curated a set of{" "}
                    <span className="font-bold text-blue-500 font-mono">
                      personalized suggestions
                    </span>{" "}
                    that align closely with your current research interests.
                    Your{" "}
                    <span className="text-blue-500 font-bold font-mono">
                      research interests
                    </span>{" "}
                    are converted into vector representations, which are then
                    matched against each professor’s own{" "}
                    <span className="text-blue-500 font-bold font-mono">
                      research interests
                    </span>{" "}
                    using{" "}
                    <span className="underline text-blue-600 font-mono cursor-pointer">
                      cosine similarity scoring
                    </span>{" "}
                    {"[1]"}.
                  </p>
                </div>
                
              </div>{" "}
              <div className="flex items-end">
                <SearchForm className="font-noto px-7 w-[30rem]" />
                <FilterRecommendations />
              </div>
              <Separator className = "mx-9 my-4"/>
              <Recommendations />
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
