"use client";

import { Button } from "@/shadcomponents/ui/button";
import { Input } from "@/shadcomponents/ui/input";
import { Label } from "@/shadcomponents/ui/label";
import { useRouter } from "next/navigation";
import { useSavedStore } from "../store/useSavedStore";
import { useAppliedStore } from "../store/useAppliedStore";
import { handleLogin } from "./actions";
import { useActionState } from "react";
import { useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";

import { CheckCircle, LogIn, Loader2 } from "lucide-react";


const initialLoginState = {
  message: "",
  savedProfessors: [],
  appliedProfessors: [],
  success: false,
};

export default function Login() {
  const [state, formAction] = useActionState(handleLogin, initialLoginState);
  const router = useRouter();
  const setSavedProfessors = useSavedStore((state) => state.setSavedStore);
  const setAppliedProfessors = useAppliedStore((state) => state.setAppliedStore);
  const hasRedirected = useRef(false);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.success && !hasRedirected.current) {
      hasRedirected.current = true;
      setSavedProfessors(state.savedProfessors);
      setAppliedProfessors(state.appliedProfessors);
      const timer = setTimeout(() => {
        router.push("/repository");
      }, 1000);

      return () => clearTimeout(timer); 
    }
  }, [state.success, state.savedProfessors, state.appliedProfessors, router, setSavedProfessors, setAppliedProfessors]);


  return (
    <div className="flex flex-col justify-center items-center mt-20 font-sans">
      <h1 className="font-sans tracking-wide font-bold text-2xl">
        Think it. Make it.
      </h1>
      <h1 className="font-sans tracking-wide font-bold text-xl text-gray-400">
        Start Now!
      </h1>
      <form action={formAction}>
        <div className="mt-5 flex flex-col space-y-2">
          <Label className="font-sans text-xs font-semibold" htmlFor="email">
            University Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="p-2 border border-gray-200 bg-gray-50 rounded-md w-[20rem]"
            disabled={pending || state.success}
          />
          <Label className="font-sans text-xs font-semibold" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="p-2 border border-gray-200 bg-gray-50 rounded-md w-[20rem]"
            disabled={pending || state.success}
          />
          <h2 className="font-sans text-gray-500 w-[20rem] text-sm">
            Use an organization Email to easily collaborate with teammates
          </h2>
        </div>

        <Button
          type="submit"
          className={`mt-5 text-white w-fit rounded-md font-sans cursor-pointer font-light py-2 px-4 flex items-center justify-center gap-2
            ${
              state.success
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          disabled={pending || state.success}
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Authenticating...
            </>
          ) : state.success ? (
            <>
              <CheckCircle className="h-4 w-4" /> Success!
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" /> Continue
            </>
          )}
        </Button>
        <div>
          {state.message && (
            <p
              className={`font-sans text-sm mt-2 ${
                state.success ? "text-green-500" : "text-red-500"
              }`}
            >
              {state.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}