import Builder from "@/app/components/resume/builder";

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
} from "@/shadcomponents/ui/sidebar";

import {
  Laptop,
  MapIcon,
  MoveLeft,
  MoveRight,
  PencilLineIcon,
  PersonStandingIcon,
  Plus,
} from "lucide-react";

export default function resume() {
  return (
    <>
      <SidebarProvider>
        <SidebarInset>
          <header className="flex h-8 shrink-0 items-center gap-2 px-6">
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
                <BreadcrumbSeparator>
                  <div className="text-gray-300">/</div>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
                    <PencilLineIcon className="fill-blue-700 text-white" />
                    Resume
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <div className="text-gray-300">/</div>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
                    <PersonStandingIcon className="text-blue-700" />
                    Eldan Cohen
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className=" space-x-2 select-none">
            <Builder researchInterests={research_interests} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
