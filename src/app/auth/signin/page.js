import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/shadcomponents/ui/breadcrumb";
import {
  Paperclip,
  Laptop,
  LockKeyhole,
} from "lucide-react";

export default async function SignIn() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  return (
    <>
      <Breadcrumb className="font-main font-semibold flex flex-wrap sm:flex-nowrap h-8 items-center gap-2 px-4 sm:px-6 py-2">
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:flex">
            <BreadcrumbLink
              href="/"
              className="flex items-center font-medium text-xs text-[#37352F] gap-2 hover:underline"
            >
              <Laptop className="rounded-xs text-white fill-[#5AC2FF] h-5 w-5" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <div className="text-gray-300">/</div>
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-main font-medium text-xs text-[#37352F] hover:underline cursor-pointer flex items-center gap-2">
              <LockKeyhole className="text-[#5AC2FF] h-4 w-4" />
              Login
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-0 space-y-10 font-main">
        <div className="flex flex-col items-center text-center space-y-5">
          <Paperclip className="h-20 w-20" />
          <div className="flex flex-col gap-2">
            <h1 className="font-playfair text-2xl sm:text-3xl">
              Great to See You Again!
            </h1>
            <h2 className="text-sm sm:text-md">
              Connect with Google To Get Started!
            </h2>
          </div>
        </div>

        <div>
          <a
            className="shadow-sm py-2 text-sm rounded-xs px-16 hover:bg-[#F1F1EF] cursor-pointer bg-[#FFFFFF] border text-[#2F3438]"
            href={`${API_BASE}/auth/signin-with-google`}
          >
            Login With Google
          </a>
        </div>
      </div>
    </>
  );
}
