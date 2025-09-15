import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/shadcomponents/ui/breadcrumb";
import {
  Laptop,
  LockKeyhole,
  Plane,
} from "lucide-react";

export default async function SignUp() {
  return (
    <>
      <Breadcrumb className="font-main font-semibold flex flex-wrap sm:flex-nowrap h-8 items-center gap-2 px-4 sm:px-6 py-2">
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:flex">
            <BreadcrumbLink
              href="/"
              className="flex items-center font-medium text-[#37352F] gap-2 hover:underline"
            >
              <Laptop className="rounded-xs text-white fill-blue-700 h-5 w-5" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <div className="text-gray-300">/</div>
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-main flex items-center gap-2 font-medium hover:underline cursor-pointer text-[#37352F]">
              <LockKeyhole className="text-blue-700 h-4 w-4" />
              Sign Up
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-0 space-y-10 font-main">
        <div className="flex flex-col items-center text-center space-y-5">
          <Plane className="h-20 w-20 stroke-1" />
          <div className = "flex flex-col gap-2">
            <h1 className="font-playfair text-2xl sm:text-3xl">
              {"Let's Get You Started!"}
            </h1>
            <h2 className="text-sm sm:text-md">
              Connect with your Gmail Account
            </h2>
          </div>
        </div>

        <div>
          <a
            className="shadow-sm py-2 text-sm rounded-xs px-16 hover:bg-[#F1F1EF] cursor-pointer bg-[#FFFFFF] border text-[#2F3438]"
            href="http://localhost:8080/auth/signup-with-google"
          >
            Register With Google
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
