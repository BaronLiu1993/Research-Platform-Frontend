import { Button } from "@/shadcomponents/ui/button";

export default function Login() {
  return (
    <>
      <div className="flex flex-col gap-6 items-center mt-20 h-screen font-main p-6">
        <div className="flex flex-col mt-20">
          <h1 className="tracking-wide font-bold text-2xl">
            Welcome to Research
          </h1>
          <h1 className="text-gray-700">Begin Outreaching!</h1>
        </div>

        <div>
          <a
            className="shadow-sm py-2 text-sm rounded-xs px-16 hover:bg-[#F1F1EF] cursor-pointer bg-[#FFFFFF] border text-[#2F3438]"
            href="http://localhost:8080/auth/signin-with-google"
          >
            Continue With Google
          </a>
        </div>

        <div className="text-xs font-light text-center max-w-sm mb-6">
          By clicking "Connect with Google" above you acknowledge that you have
          read, understood and agree to the{" "}
          <span className="underline">Terms and Services</span> and{" "}
          <span className="underline">Privacy Policy</span> as applicable with
          your use of this app.
        </div>
      </div>
    </>
  );
}
