"use server";

import { cookies } from "next/headers";
import Link from "next/link";

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
import { Badge } from "@/shadcomponents/ui/badge";
import {
  Database,
  Laptop,
  MapIcon,
  MoveLeft,
  MoveRight,
  Plus,
} from "lucide-react";

export default async function Repository({ searchParams }) {
  const cookieStore = cookies();
  const access = cookieStore.get("access_token")?.value;
  const userId = cookieStore.get("user_id")?.value;

  const pageNumber = Number(searchParams?.page ?? 1) || 1;
  const rawSearch = (searchParams?.search ?? "").trim();
  const search = encodeURIComponent(rawSearch);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

  const [savedProfessorData, appliedProfessorData] = await Promise.all([
    fetch(`${API_BASE}/saved/repository/get-all-savedId`, {
      method: "GET",
      headers: access ? { Authorization: `Bearer ${access}` } : {},
      next: { revalidate: 600 },
    }),
    fetch(`${API_BASE}/inprogress/repository/get-all-appliedId`, {
      method: "GET",
      headers: access ? { Authorization: `Bearer ${access}` } : {},
      next: { revalidate: 600 },
    }),
  ]);

  const [savedProfessorDataJson, appliedProfessorDataJson] = await Promise.all([
    savedProfessorData.ok ? savedProfessorData.json() : Promise.resolve({ data: [] }),
    appliedProfessorData.ok ? appliedProfessorData.json() : Promise.resolve({ data: [] }),
  ]);

  // Table + profile in parallel
  const [tableRes, profileRes] = await Promise.all([
    fetch(`${API_BASE}/repository/taishan?page=${pageNumber}&search=${search}`, {
      headers: access ? { Authorization: `Bearer ${access}` } : {},
      next: { revalidate: 300 },
    }),
    fetch(`${API_BASE}/auth/get-user-sidebar-info`, {
      headers: access ? { Authorization: `Bearer ${access}`, "Content-Type": "application/json" } : {},
      next: { revalidate: 300 },
    }),
  ]);

  const { tableData = [], tableCount = 0 } = tableRes.ok ? await tableRes.json() : { tableData: [], tableCount: 0 };
  const parsedUserProfile = profileRes.ok ? await profileRes.json() : {};

  return (
    <SidebarProvider>
      <AppSidebar student_data={parsedUserProfile} />
      <SidebarInset>
        <header className="flex h-10 shrink-0 items-center gap-2 px-4 sm:px-6 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50">
          <SidebarTrigger className="cursor-pointer" />
          <Breadcrumb className="font-main font-semibold">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link href="/" className="font-main flex items-center gap-2 font-light text-[#37352F]">
                    <Laptop className="h-5 w-5 text-blue-700" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-main flex items-center gap-2 font-light text-[#37352F]">
                  <MapIcon className="h-5 w-5 text-blue-700" />
                  Professors
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 overflow-y-auto font-main">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
            <div className="my-8 sm:my-10 space-y-2">
              <div className="mt-2">
                <div className="flex items-center justify-between gap-2 pt-2">
                  <h1 className="text-xl sm:text-2xl text-[#37352F] font-semibold">Curated Professors</h1>
                </div>
                <div className="flex items-center py-2 gap-2">
                  <Badge variant="secondary" className="bg-[#F1F1EF] text-[#37352F] rounded-md text-[11px]">
                    <Database className="w-3.5 h-3.5 mr-1" />
                    Recommended Professors
                  </Badge>
                  <span className="rounded-full h-1 w-1 bg-[#37352F]" />
                  <span className="text-[11px] font-medium text-[#37352F]">By Jie Xuan Liu</span>
                </div>
              </div>

              <Recommendations />
            </div>

            {/* Data table */}
            <div className="mb-8">
              <DataTable
                generateColumns={generateColumns}
                data={tableData}
                userId={userId}
                pageNumber={pageNumber}
                search={rawSearch}
                access={access}
                savedProfessors={savedProfessorDataJson}
                appliedProfessors={appliedProfessorDataJson}
              />
              {typeof tableCount === "number" && (
                <p className="text-xs text-gray-500 mt-2">{tableCount} results</p>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
