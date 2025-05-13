import { cookies } from "next/headers";
import Kanban from "../components/bookmark/kanban";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/shadcomponents/ui/sidebar";
import { AppSidebar } from "../components/sidebar";
import { Separator } from "@/shadcomponents/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcomponents/ui/breadcrumb";

export default async function Bookmark() {
  const cookieStore = await cookies();
  const user_id = cookieStore.get("user_id");
  return (
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
                <BreadcrumbPage>Bookmarked Professors</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 overflow-y-auto font-sans">
          <div className="w-full flex p-6 space-x-6">
            <Kanban user_id={user_id} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
