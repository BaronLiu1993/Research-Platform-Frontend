"use server"

import { cookies } from "next/headers";
import GithubLoginButton from "@/app/components/notion/auth/githubLogin";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shadcomponents/ui/breadcrumb";
import {
  MoveLeft,
  MoveRight,
  Plus,
  Laptop,
  Paperclip,
  LockKeyhole,
} from "lucide-react";

export default async function InboxAuth() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_id")
  const linkResponse = await fetch(`http://localhost:8080/auth/github/${userId.value}`)
  const parsedLinkResponse = await linkResponse.json()

  console.log(parsedLinkResponse)
  return (
    <>
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
              <LockKeyhole className="text-blue-700 h-4 w-4" />
              Authenticate
            </BreadcrumbPage>
          </BreadcrumbItem>
          
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full mt-30 flex flex-col space-y-10 justify-center items-center font-main">

        <div className="flex justify-center items-center flex-col space-y-5">
          <Paperclip className="h-20 w-20" />
          <div>
            <h1 className="font-semibold text-2xl">
              Welcome to Your Mail Inbox
            </h1>
            <h2 className="font-semibold text-md">
              Connect with jiexuan.liu@mail.utoronto.ca
            </h2>
          </div>
        </div>
        <div className="space-y-5">
          <GithubLoginButton link ={parsedLinkResponse}/>
        </div>
        <div>
          <p className="font-light text-xs w-[30rem] text-center">
            By clicking "Connect with Google" above, you acknowledge that you
            have read, understood and agree to the{" "}
            <span className="font-semibold">Terms and Conditions</span> and
            Privacy Policy as applicable to your use.
          </p>
        </div>
      </div>
    </>
  );
}
