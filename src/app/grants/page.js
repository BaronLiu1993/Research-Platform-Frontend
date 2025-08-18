import { cookies } from "next/headers";
import { AppSidebar } from "../components/sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/shadcomponents/ui/sidebar";
import {
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbList,
  Breadcrumb,
  BreadcrumbLink,
} from "@/shadcomponents/ui/breadcrumb";
import {
  MoveLeft,
  MoveRight,
  Plus,
  Laptop,
  MapIcon,
  Banknote,
} from "lucide-react";
import { GrantDataTable } from "../components/grant/grant-data-table";
import { GrantColumns } from "../components/grant/grantcolumns";

export default async function Grants() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access_token");
  const [userResponse, grantsResponse] = await Promise.all([
    await fetch("http://localhost:8080/auth/get-user-sidebar-info", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access?.value}`,
        "Content-Type": "application/json",
      },
    }),
    fetch("http://localhost:8080/grants/get-grants", {
      method: "GET",
    }),
  ]);

  const [parsedUserProfile, parsedGrantsProfile] = await Promise.all([
    await userResponse.json(),
    await grantsResponse.json(),
  ]);
  console.log(parsedGrantsProfile);
  return (
    <>
      <SidebarProvider>
        <AppSidebar student_data={parsedUserProfile} />
        <SidebarInset>
          <header className="flex h-8 shrink-0 items-center gap-2 px-6">
            <SidebarTrigger className="cursor-pointer" />
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
                <BreadcrumbItem className="hidden md:block hover:underline cursor-pointer">
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
                  <BreadcrumbPage className="font-main flex items-center hover:underline cursor-pointer gap-2 font-medium text-[#37352F]">
                    <Banknote className="fill-blue-700 text-white" />
                    Grants
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div>
            <GrantDataTable columns={GrantColumns} data={parsedGrantsProfile.data} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
