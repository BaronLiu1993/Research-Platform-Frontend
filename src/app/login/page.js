"use client";

import { Button } from "@/shadcomponents/ui/button";
import { Input } from "@/shadcomponents/ui/input";

//Zustand
import { useSavedStore } from "../store/useSavedStore";

//Actions Imports
import { handleLogin } from "./actions";
import { useActionState } from "react";
import { Label } from "@/shadcomponents/ui/label";

const initialLoginState = {
  message: "",
  savedProfessors: [],
  success: false,
};

export default function Login() {
  const [state, formAction] = useActionState(handleLogin, initialLoginState);
  console.log(state.savedProfessors)
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-20 font-sans">
        <h1 className="font-sans tracking-wide font-bold text-2xl">
          Think it. Make it.
        </h1>
        <h1 className="font-sans tracking-wide font-bold text-xl text-gray-400">
          Start Now!
        </h1>
        <form action={formAction}>
          <div className="mt-5 flex flex-col space-y-2">
            <Label className="font-sans text-xs font-semibold">
              University Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="p-2 border border-gray-200 bg-gray-50 rounded-md w-[20rem]"
            />
            <Label className="font-sans text-xs font-semibold">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="p-2 border border-gray-200 bg-gray-50 rounded-md w-[20rem]"
            />
            <h2 className="font-sans text-gray-500 w-[20rem] text-sm">
              Use an organization Email to easily collaborate with teammates
            </h2>
          </div>

          <Button
            type="submit"
            className="bg-blue-500 mt-5 text-white w-fit rounded-md font-sans font-light py-2"
          >
            Continue
          </Button>
          {state.message && (
            <p className="font-sans text-red-500">{state.message}</p>
          )}
        </form>
      </div>
    </>
  );
}
