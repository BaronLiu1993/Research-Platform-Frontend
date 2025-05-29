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
import { Database, Settings } from "lucide-react";

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
          <Breadcrumb className="font-main font-semibold">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-main font-semibold">
                  Professors
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 overflow-y-auto font-main">
          <div className="flex flex-col">
            <div className="border-b-1 space-y-2">
              <div className="bg-neutral-100 mx-9 rounded-xs mt-2 border-1">
                <div className="flex gap-2 px-6 pt-6">
                  <h1 className="text-xl text-neutral-700 font-semibold h-fit">
                    Curated Professors
                  </h1>
                  <Badge>
                    <Database />
                    Data Engineering
                  </Badge>
                </div>
                <h2 className="text-xs px-6 font-semibold">By Jie Xuan Liu</h2>
                <div className="space-y-1 py-6">
                  <p className="text-neutral-500 text-xs px-6 w-[60rem] ">
                    Based on the topics you’ve been exploring, we’ve curated a
                    set of{" "}
                    <span className="bg-yellow-200 font-bold">
                      personalized suggestions
                    </span>{" "}
                    that align closely with your current research interests.
                    Your{" "}
                    <span className="text-blue-700 font-bold">
                      research interests
                    </span>{" "}
                    are converted into vector representations, which are then
                    matched against each professor’s own{" "}
                    <span className="text-blue-700 font-bold">
                      research interests
                    </span>{" "}
                    using{" "}
                    <span className="underline text-blue-600 font-mono cursor-pointer">
                      cosine similarity scoring
                    </span>{" "}
                    {"[1]"}.
                  </p>
                  <div className="text-neutral-500 text-xs px-6 w-[60rem] space-y-2">
                    <p></p>
                    <ol type="1" className="font-mono">
                      <li className="flex">
                        1. Navigate To{" "}
                        <span className="flex items-center">
                          <Settings className=" mx-1 h-3 w-3" />
                          Settings.
                        </span>{" "}
                      </li>
                      <li>
                        2. Change your research interests in the dropdown box.
                      </li>
                      <li>3. Wait for new vectors and check here again</li>
                    </ol>
                  </div>
                </div>
              </div>{" "}
              <div className="flex items-end">
                <SearchForm className="font-main px-7 w-[30rem]" />
                <FilterRecommendations />
              </div>
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
