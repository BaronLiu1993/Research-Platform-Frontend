import { cookies } from "next/headers";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/shadcomponents/ui/breadcrumb";
import {
  SidebarTrigger,
} from "@/shadcomponents/ui/sidebar";

import generateColumns from "@/app/components/repository/columns";
import { DataTable } from "@/app/components/repository/data-table";
import Recommendations from "@/app/components/repository/recommendations";
import { Badge } from "@/shadcomponents/ui/badge";
import { Database, Laptop } from "lucide-react";

export default async function Repository({ searchParams }) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access_token")?.value;
  const sp = await searchParams;
  const pageNumber = Number(sp?.page ?? 1) || 1;
  const filters = {
    school: typeof sp?.school === "string" ? sp.school : "",
    faculty:
      typeof sp?.faculty === "string" ? sp.faculty : "",
    department:
      typeof sp?.department === "string"
        ? sp.department
        : "",
  };

  const rawSearch = (
    typeof sp?.search === "string" ? sp.search : ""
  ).trim();

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

  const qs = new URLSearchParams({
    page: String(pageNumber),
    search: rawSearch,
    ...(filters.school && { school: filters.school }),
    ...(filters.faculty && { faculty: filters.faculty }),
    ...(filters.department && { department: filters.department }),
  }).toString();

  const tableFetchOpts = {
    headers: access ? { Authorization: `Bearer ${access}` } : {},
    ...(access
      ? { cache: "no-store" }
      : { next: { revalidate: 300 }, cache: "force-cache" }),
  };

  const savedFetchOpts = {
    method: "GET",
    headers: access ? { Authorization: `Bearer ${access}` } : {},
  };

  let tableData = [];
  let savedIds = [];
  let tableCount = 0;

  try {
    const [tableRes, savedRes] = await Promise.all([
      fetch(`${API_BASE}/repository/taishan?${qs}`, tableFetchOpts),
      fetch(`${API_BASE}/saved/repository/get-all-savedId`, savedFetchOpts),
    ]);

    if (tableRes.ok) {
      const json = await tableRes.json();
      tableData = json?.tableData ?? [];
      tableCount = Number(json?.tableCount ?? 0);
    }

    if (savedRes.ok) {
      savedIds = await savedRes.json();
    }
  } catch {
    //log with telemetry
  }

  return (
    <>
          <header className="sticky top-0 z-10 flex h-10 shrink-0 items-center gap-2 px-4 sm:px-6 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50">
            <SidebarTrigger className="cursor-pointer text-black" />
            <div className="h-5 w-px bg-gray-300" />
            <Breadcrumb className="font-main font-semibold">
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link
                      href="/repository"
                      className="font-main font-medium text-xs flex items-center hover:underline gap-2 text-[#37352F]"
                    >
                      <Laptop className="h-5 w-5 text-black" />
                      Repository
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <div className="flex-1 overflow-y-auto overflow-x-hidden font-main">
            <div className="w-full max-w-screen-xl px-4 sm:px-6">
              <div className="my-8 sm:my-10 space-y-2">
                <div className="mt-2 mx-6">
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <h1 className="text-xl sm:text-2xl text-[#37352F] font-semibold">
                      Curated Professors
                    </h1>
                  </div>
                  <div className="flex items-center py-2 gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-[#F1F1EF] text-[#37352F] rounded-md text-[11px]"
                    >
                      <Database className="w-3.5 h-3.5 mr-1" />
                      Recommended For You!
                    </Badge>
                  </div>
                </div>

                <Recommendations />
              </div>

              <div className="mb-8 overflow-x-auto">
                <DataTable
                  generateColumns={generateColumns}
                  data={tableData}
                  pageNumber={pageNumber}
                  search={rawSearch}
                  access={access}
                  savedProfessors={savedIds}
                />
                {Number.isFinite(tableCount) && (
                  <p className="text-xs text-gray-500 mt-2">
                    {tableCount} results
                  </p>
                )}
              </div>
            </div>
          </div>
    </>
  );
}
