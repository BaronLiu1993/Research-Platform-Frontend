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
  MoveLeft,
  MoveRight,
  Plus,
  Laptop,
  LockKeyhole,
} from "lucide-react";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function SignIn() {
  const cookieStore = cookies();
  const access = await cookieStore.get("access_token");
  const refresh = await cookieStore.get("refresh_token");
  const userId = await cookieStore.get("user_id");

  if (access && refresh && userId) {
    redirect("/repository");
  }
  return (
    <>
      <Breadcrumb className="font-main font-semibold flex flex-wrap sm:flex-nowrap h-8 items-center gap-2 px-4 sm:px-6 py-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <MoveLeft className="w-5 h-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <MoveRight className="w-5 h-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Plus className="w-5 h-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
          </BreadcrumbItem>
          <BreadcrumbItem className="hidden md:flex">
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
              <LockKeyhole className="text-blue-700 h-4 w-4" />
              Authenticate
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-0 space-y-10 font-main">
        <div className="flex flex-col items-center text-center space-y-5">
          <Paperclip className="h-20 w-20" />
          <div>
            <h1 className="font-semibold text-2xl sm:text-3xl">
              Welcome to Your Mail Inbox
            </h1>
            <h2 className="text-sm sm:text-md">
              Connect with jiexuan.liu@mail.utoronto.ca
            </h2>
          </div>
        </div>

        <div>
          <a
            className="shadow-sm py-2 text-sm rounded-xs px-16 hover:bg-[#F1F1EF] cursor-pointer bg-[#FFFFFF] border text-[#2F3438]"
            href="http://localhost:8080/auth/signin-with-google"
          >
            Login With Google
          </a>
        </div>

        <div className="max-w-xl text-center px-2 sm:px-0">
          <p className="font-light text-xs sm:text-sm text-gray-700">
            By clicking{" "}
            <span className="font-semibold">"Connect with Google"</span> above,
            you acknowledge that you have read, understood and agree to the{" "}
            <span className="font-semibold">Terms and Conditions</span> and
            Privacy Policy as applicable to your use.
          </p>
        </div>
      </div>
    </>
  );
}
