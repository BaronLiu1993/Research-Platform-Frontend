"use server";

import RegisterClientWrapper from "./registerClientWrapper";
import { cookies } from "next/headers";

export default async function RegisterPage() {
  const cookieStore = cookies();
  const access = cookieStore.get("access_token")?.value;
  return (
    <div className="flex justify-center items-center flex-col min-h-screen gap-6">
      
      <RegisterClientWrapper access = {access}s/>
    </div>
  );
}
