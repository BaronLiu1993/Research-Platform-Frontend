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
  Banknote,
  Glasses,
} from "lucide-react";

import { GrantDataTable } from "../components/grant/grant-data-table";
import { GrantColumns } from "../components/grant/grantcolumns";
import { Badge } from "@/shadcomponents/ui/badge";
import { redirect } from "next/navigation";

export default async function Grants() {
  try {
    const cookieStore = await cookies();
    const access = cookieStore.get("access_token")?.value;

    if (!access) {
      redirect("/repository");
    }

    const [userResponse, grantsResponse] = await Promise.all([
      await fetch("http://localhost:8080/auth/get-user-sidebar-info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      }),
      fetch("http://localhost:8080/grants/get-grants", {
        method: "GET",
      }),
    ]);

    if (!userResponse.ok || !grantsResponse.ok) {
      redirect("/repository");
    }

    const [parsedUserProfile, parsedGrantsProfile] = await Promise.all([
      await userResponse.json(),
      await grantsResponse.json(),
    ]);
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
                      Grants and Scholarships
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="py-10 px-10">
              <div className="mt-6">
                <div className="text-2xl text-[#787774] font-semibold h-fit">
                  Grants and Scholarships
                </div>
                <div className="flex items-center py-2 space-x-2">
                  <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-xs text-[10px]">
                    <Glasses />
                    Discover Research Grant Opportunities
                  </Badge>
                  <div className="rounded-full h-1 w-1 bg-[#37352F]"></div>
                  <h2 className="text-xs font-semibold text-[10px] text-[#37352F]">
                    By Jie Xuan Liu
                  </h2>
                </div>
                <div>
                  <h2 className=" py-4 text-sm font-light text-[#37352F]">
                    Discover Different Grants From Different Universities all In
                    One Place!
                  </h2>
                </div>
              </div>
              <GrantDataTable
                columns={GrantColumns}
                data={parsedGrantsProfile.data}
              />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </>
    );
  } catch {
    redirect("/repository");
  }
}
