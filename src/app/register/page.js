"use server";

import RegisterClientWrapper from "./registerClientWrapper";
import { cookies } from "next/headers";

export default async function RegisterPage() {
  const cookieStore = cookies();
  const access = cookieStore.get("access_token")?.value;
  return (
    <div className="flex justify-center items-center flex-col min-h-screen gap-6">
      <h1 className="font-sans font-semibold text-2xl">
        Let Us Learn More About Your Interests!
      </h1>
      <RegisterClientWrapper access = {access}s/>
    </div>
  );
}
