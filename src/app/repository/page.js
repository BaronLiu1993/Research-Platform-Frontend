import { Separator } from "@/shadcomponents/ui/separator";
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
import columns from "./columns";
import { DataTable } from "./data-table";

export default async function Repository() {
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
          <Breadcrumb className="font-sans">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>UofT Professors Repository</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col">
            <div className = "border-b-1 space-y-2">
              <h1 className="text-2xl font-sans font-semibold px-6 pt-6">
                Discover Professors at UofT!
              </h1>
              <p className="text-muted-foreground px-6 pb-6 font-sans">
                Browse through faculty members across departments, explore their
                research interests, and find the perfect mentor <br/> for your academic
                journey. Start connecting with UofT professors today!
              </p>{" "}
            </div>
            <div className="mt-4">
              <DataTable columns={columns} data={responses} />
              
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
